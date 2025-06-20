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
const get_all_task = async_handler(async (req, res) => {
    const { email } = req?.user;
    const result = await task_services.get_all_task_from_db(email)
    manage_response(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Task fetched successful",
        data: result
    })
})
const update_task = async_handler(async (req, res) => {
    const { taskId } = req?.params
    const { email } = req?.user;
    const result = await task_services.update_task_into_db(email, taskId, req?.body)
    manage_response(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Task update successful",
        data: result
    })
})
const delete_task = async_handler(async (req, res) => {
    const { taskId } = req?.params
    const { email } = req?.user;
    const result = await task_services.delete_task_into_db(email, taskId)
    manage_response(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Task delete successful",
        data: result
    })
})
export const task_controller = {
    create_new_task,
    get_all_task,
    update_task,
    delete_task
}