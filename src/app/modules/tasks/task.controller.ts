import async_handler from "../../utils/async_handler";
import manage_response from "../../utils/manage_response";
import { task_services } from "./task.service";
import httpStatus from 'http-status';

const create_new_task = async_handler(async (req, res) => {
    const { email } = req?.user;
    const payload = {
        ...req?.body,
        userEmail: email
    }
    const result = await task_services.create_new_task_into_db(payload)
    manage_response(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Task created..",
        data: result
    })
})

export const task_controller = {
    create_new_task
}