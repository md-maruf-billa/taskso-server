import { z } from "zod";

const register = z.object({
    name: z.string({ required_error: "Name is required!!" }),
    email: z.string({ required_error: "Email is required!!" }),
    password: z.string({ required_error: "Password is required!!" })
})


const login = z.object({
    email: z.string({ required_error: "Email is required!!" }),
    password: z.string({ required_error: "Password is required!!" }),
})
const forget = z.object({
    email: z.string({ required_error: "Email is required!!" }),
})
const change_password = z.object({
    email: z.string({ required_error: "Email is required!!" }),
    oldPassword: z.string({ required_error: "Old Password is required!!" }),
    newPassword: z.string({ required_error: "New Password is required!!" }),
})

export const auth_validation = {
    register,
    login,
    forget,
    change_password
}