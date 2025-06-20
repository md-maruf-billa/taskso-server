import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
    jwtPayload: { user_id: Types.ObjectId; email: string },
    secret: string,
    expiresIn: string,
) => {
    const token = jwt.sign(jwtPayload, secret, {
        algorithm: 'HS256',
        expiresIn: expiresIn,
    } as SignOptions);

    return token;
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};