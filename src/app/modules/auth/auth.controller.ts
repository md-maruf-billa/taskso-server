import configs from "../../configs";
import async_handler from "../../utils/async_handler";
import manage_response from "../../utils/manage_response";
import { auth_services } from "./auth.service";
import httpStatus from 'http-status';

const register_new_user = async_handler(async (req, res) => {
    const payload = req?.body;
    const result = await auth_services.register_new_user_into_db(payload)
    manage_response(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Account created successful.",
        data: result
    })
})
const login_user = async_handler(async (req, res) => {
    const payload = req?.body;
    const result = await auth_services.login_user_from_db(payload)
    if (result?.accessToken) {
        res.cookie("accessToken", result?.accessToken, {
            secure: configs.env_type == "production",
            httpOnly: true
        })
    }
    manage_response(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Login Successful.",
        data: result
    })
})

const forget_password = async_handler(async (req, res) => {
    const email = req?.body?.email;
    const result = await auth_services.forget_password_from_db(email)
    manage_response(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Reset link send on email",
        data: result
    })
})
const rest_password = async_handler(async (req, res) => {
    const result = await auth_services.reset_password_into_db(req?.body)
    manage_response(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password reset successful",
        data: result
    })
})
const change_password = async_handler(async (req, res) => {
    const result = await auth_services.change_password_into_db(req?.body)
    manage_response(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password change successful",
        data: result
    })
})


export const auth_controller = {
    register_new_user,
    login_user,
    forget_password,
    rest_password,
    change_password
}