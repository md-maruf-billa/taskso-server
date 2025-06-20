/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export interface TUser {
    email: string;
    password: string;
    name: string;
    profilePhoto?: string
    passwordChangedAt?: Date;
    status?: 'active' | 'blocked';
    isDeleted?: boolean;
}

export interface IUserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}
