import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { user_controllers } from "./user.controller";
import validateRequest from "../../middlewares/validate_request";
import { user_validation } from "./user.validation";
import upload from "../../utils/multer";

const user_router = Router()

user_router.get("/me", auth(), user_controllers.get_me)
user_router.patch(
    "/update-profile",
    auth(),
    upload.single("image"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req?.body?.data)
        next()
    },
    validateRequest(user_validation.update),
    user_controllers.update_profile
)
user_router.delete("/delete-profile",auth(),user_controllers.delete_profile)




export default user_router;