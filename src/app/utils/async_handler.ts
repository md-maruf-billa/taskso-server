import { NextFunction, Request, RequestHandler, Response } from 'express';

const async_handler = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};

export default async_handler;