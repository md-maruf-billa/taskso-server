import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import async_handler from '../utils/async_handler';
import AppError from '../errors/app_error';
import configs from '../configs';
import { UserModel } from '../modules/users/user.schema';


const auth = () => {
    return async_handler(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // checking if the token is missing
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        // checking if the given token is valid
        const decoded = jwt.verify(
            token,
            configs.jwt.access_secret as string,
        ) as JwtPayload;

        const { user_id, iat } = decoded;

        // checking if the user is exist
        const user = await UserModel.isUserExistsByCustomId(user_id);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        }
        // checking if the user is already deleted

        const isDeleted = user?.isDeleted;

        if (isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
        }

        // checking if the user is blocked
        const userStatus = user?.status;

        if (userStatus === 'blocked') {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
        }

        if (
            user.passwordChangedAt &&
            UserModel.isJWTIssuedBeforePasswordChanged(
                user.passwordChangedAt,
                iat as number,
            )
        ) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
        }
        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;