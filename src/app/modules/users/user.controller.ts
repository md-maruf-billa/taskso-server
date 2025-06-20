import async_handler from "../../utils/async_handler"
import manage_response from "../../utils/manage_response";
import { user_services } from "./user.service";
import httpStatus from 'http-status';

const get_me = async_handler(async (req, res) => {
    const { email } = req?.user;
    const result = await user_services.get_me_from_db(email)
    manage_response(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User data fetched.",
        data: result
    })
})
const update_profile = async_handler(async (req, res) => {
    const { email } = req?.user;
    const payload = {
        ...req?.body,
        profilePhoto: req?.file?.path
    }
    const result = await user_services.update_profile_into_db(email, payload)
    manage_response(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile update successful.",
        data: result
    })
})

const delete_profile = async_handler(async(req,res)=>{
    const {email} = req?.user;
    const result = await user_services.delete_user_form_db(email)
    manage_response(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile delete successful.",
        data: result
    })
})






export const user_controllers = {
    get_me,
    update_profile,
    delete_profile
}