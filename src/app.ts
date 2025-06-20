import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser"
import manage_response from './app/utils/manage_response';
import useragent from 'express-useragent'
import appRouter from './routes';
import globalErrorHandler from './app/middlewares/global_error_handler';
import notFound from './app/middlewares/not_found';
const app = express()


// middlewares
app.use(express.json())
app.use(express.raw())
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(useragent.express());

// routes
app.use("/api", appRouter)


// test route
app.get("/", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.useragent;
    manage_response(res, {
        success: true,
        message: "Server is working fine!!",
        statusCode: 200,
        data: {
            ip: ip,
            device: userAgent
        }
    })
})

app.use(globalErrorHandler)
app.use(notFound)


export default app;