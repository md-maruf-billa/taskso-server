import { TStatus, TTask } from "./task.interface";
import { TaskModel } from "./task.schema";

const create_new_task_into_db = async (payload: TTask) => {
    const result = await TaskModel.create(payload)
    return result;
}

const get_single_task_from_db = async (email: string, takId: string) => {
    const result = await TaskModel.findOne({ userEmail: email, _id: takId })
    return result;
}
const get_all_task_from_db = async (email: string) => {
    const result = await TaskModel.find({ userEmail: email })
    return result;
}

const update_task_into_db = async (email: string, taskId: string, payload: Partial<TTask>) => {
    const result = await TaskModel.findOneAndUpdate(
        { userEmail: email, _id: taskId },
        payload,
        { new: true }
    )
    return result
}
const delete_task_into_db = async (email: string, taskId: string) => {
    const result = await TaskModel.findOneAndDelete(
        { userEmail: email, _id: taskId }
    )
    return result
}
const change_status_into_db = async (email: string, taskId: string, payload: TStatus) => {
    const result = await TaskModel.findOneAndUpdate(
        { userEmail: email, _id: taskId },
        { status: payload },
        { new: true }
    )
    return result
}


export const task_services = {
    create_new_task_into_db,
    get_all_task_from_db,
    update_task_into_db,
    delete_task_into_db,
    change_status_into_db,
    get_single_task_from_db
}