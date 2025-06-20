import AppError from "../../errors/app_error";
import { TUser } from "../users/user.interface";
import { UserModel } from "../users/user.schema";
import httpStatus from 'http-status';
import { TChangePasswordPayload, TLoginPayload } from "./auth.interface";
import configs from "../../configs";
import { createToken, verifyToken } from "./auth.utils";
import { EmailSender } from "../../utils/email_sender";
import bcrypt from 'bcrypt'

const register_new_user_into_db = async (payload: TUser) => {
    const isUserExist = await UserModel.findOne({ email: payload.email })
    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User account Already Exist!!")
    }
    const result = await UserModel.create(payload)
    return result;
}
const login_user_from_db = async (payload: TLoginPayload) => {
    const isUserExist = await UserModel.findOne({ email: payload?.email }).lean()

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Account not found!")
    }
    if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "This account has deleted!")
    }
    if (isUserExist.status == "blocked") {
        throw new AppError(httpStatus.BAD_REQUEST, "This account has blocked!!!")
    }
    if (!(await UserModel.isPasswordMatched(payload?.password, isUserExist.password))) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password!!")
    }

    // create now token for secure browsing
    const jwt_payload = {
        user_id: isUserExist._id,
        email: isUserExist.email
    }
    const access_token = createToken(
        jwt_payload,
        configs.jwt.access_secret as string,
        "10d"
    )
    return {
        accessToken: access_token
    }
}

const forget_password_from_db = async (email: string) => {
    const isUserExist = await UserModel.findOne({ email }).lean()

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Account not found!")
    }
    if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "This account has deleted!")
    }
    if (isUserExist.status == "blocked") {
        throw new AppError(httpStatus.BAD_REQUEST, "This account has blocked!!!")
    }
    const reset_token = createToken({ user_id: isUserExist._id, email: isUserExist.email }, configs.jwt.reset_secret as string, '5m')
    // generate reset password link
    const reset_password_link = configs.front_end_url + `/reset-password?token=${reset_token}&email=${isUserExist.email}`

    // sending link on email
    await EmailSender(
        isUserExist?.email,
        "Reset password link",
        `
        <p>${isUserExist?.name}</p>

        <p style="color:gray; font-size:14px; margin-top:10px">
            You are requested us for reset your password. We provide a reset link below , This link valid next 5 minute.
        </p>
        <div style="display:flex;justify-content:end;">
        <a 
  href="${reset_password_link}" 
  target="_blank"
  style="
    display:inline-block;
    background-color:#04cd7e;
    color:white;
    padding:10px 16px;
    border-radius:6px;
    text-decoration:none;
    font-size:14px;"
>
  Reset Now
</a>
        </div>
        
        `
    )
    return {
        reset_password_link
    }
}

const reset_password_into_db = async (payload: { token: string, newPassword: string }) => {
    try {
        const decoded = verifyToken(payload.token, configs.jwt.reset_secret as string)
        const hashPass = bcrypt.hashSync(payload.newPassword, Number(configs.bcrypt_salt_rounds) as number)
        await UserModel.findByIdAndUpdate(decoded?.user_id, {
            password: hashPass
        })
        return null;
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, "Your rest link is expire!!")
    }
}

const change_password_into_db = async (payload: TChangePasswordPayload) => {
    const today = new Date().toISOString()
    const isUserExist = await UserModel.findOne({ email: payload.email }).lean()
    // check password
    if (!(bcrypt.compareSync(payload.oldPassword, isUserExist!.password))) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password not matched!!")
    }

    // new hash password
    const newHashPassword = bcrypt.hashSync(payload.newPassword, Number(configs.bcrypt_salt_rounds))
    await UserModel.findByIdAndUpdate({ _id: isUserExist?._id }, {
        password: newHashPassword,
        passwordChangedAt: today
    })
    return null
}

export const auth_services = {
    register_new_user_into_db,
    login_user_from_db,
    forget_password_from_db,
    reset_password_into_db,
    change_password_into_db
}