import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import async_handler from '../utils/async_handler';


const validateRequest = (schema: AnyZodObject) => {
    return async_handler(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync(req?.body);
        // await schema.parseAsync({
        //     body: req.body,
        //     cookies: req.cookies,
        // });

        next();
    });
};

export default validateRequest;