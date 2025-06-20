import { Response } from "express"

type TPayload = {
    statusCode: number,
    success: boolean,
    message: string,
    data?: any
}

const manage_response = (res: Response, payload: TPayload) => {
    res
        .status(payload?.statusCode)
        .json({
            success: payload?.success,
            message: payload?.message,
            data: payload?.data
        })
}


export default manage_response;