import { Router } from "express";
import { auth_controller } from "./auth.controller";
import validateRequest from "../../middlewares/validate_request";
import { auth_validation } from "./auth.validation";
import auth from "../../middlewares/auth";

const auth_route = Router()


// register user
auth_route.post("/register", validateRequest(auth_validation.register), auth_controller.register_new_user)
auth_route.post("/login", validateRequest(auth_validation.login), auth_controller.login_user)
auth_route.post("/forget-password", validateRequest(auth_validation.forget), auth_controller.forget_password)
auth_route.patch("/change-password", auth(), validateRequest(auth_validation.change_password), auth_controller.change_password)


export default auth_route;