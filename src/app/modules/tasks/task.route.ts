import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validate_request";
import { task_validation } from "./task.validation";
import { task_controller } from "./task.controller";

const task_route = Router()

task_route.post("/create", auth(), validateRequest(task_validation.create), task_controller.create_new_task)
task_route.get("/all", auth(), task_controller.get_all_task)
task_route.patch("/update/:taskId", auth(), validateRequest(task_validation.update), task_controller.update_task)
task_route.delete("/delete/:taskId", auth(),  task_controller.delete_task)



export default task_route;