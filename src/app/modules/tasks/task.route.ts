import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validate_request";
import { task_validation } from "./task.validation";
import { task_controller } from "./task.controller";

const task_route = Router()

task_route.post("/create", auth(), validateRequest(task_validation.create), task_controller.create_new_task)




export default task_route;