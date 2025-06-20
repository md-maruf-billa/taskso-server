import { Router } from "express";
import auth_route from "./app/modules/auth/auth.route";
import user_router from "./app/modules/users/user.route";
import task_route from "./app/modules/tasks/task.route";

const appRouter = Router()


const module_routes = [
    { path: "/auth", route: auth_route },
    { path: "/user", route: user_router },
    { path: "/task", route: task_route }
]


module_routes.forEach((route) => appRouter.use(route.path, route.route))

export default appRouter