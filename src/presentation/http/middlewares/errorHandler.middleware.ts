import type { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,

    next: NextFunction
) => {
    if (err instanceof AppError) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
            });
        }
    }

    console.log(`Uncaught error:${err.message}`);

    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.SERVER_ERROR,
    });
};
