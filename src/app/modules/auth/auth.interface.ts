export type TLoginPayload ={
    email:string,
    password:string
}

export type TChangePasswordPayload ={
    email:string,
    oldPassword:string,
    newPassword:string
}