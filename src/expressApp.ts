import express from 'express';
import type {Request,Response} from 'express'
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { STATUS_CODES } from './shared/constants/httpStatus.js';
import { MESSAGES } from './shared/constants/messages.js';
import cookieParser from "cookie-parser"
import { errorHandler } from './presentation/http/middlewares/errorHandler.middleware.js';
import appRoutes from './presentation/http/routes/appRoutes.js';
dotenv.config()


const app=express();

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:["GET","POST","DELETE","PUT","PATCH"],
        credentials:true
    })
);



app.use(cookieParser())

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1',appRoutes);

app.use((req:Request,res:Response)=>{
    res.status(STATUS_CODES.NOT_FOUND).json({message:MESSAGES.ROUTE_NOT_FOUND})
})


app.use(errorHandler);

export default app;