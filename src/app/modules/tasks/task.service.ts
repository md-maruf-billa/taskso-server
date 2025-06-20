import { TTask } from "./task.interface";
import { TaskModel } from "./task.schema";

const create_new_task_into_db = async(payload:TTask)=>{
    const result = await TaskModel.create(payload)
    return result;
}


export const task_services ={
    create_new_task_into_db
}