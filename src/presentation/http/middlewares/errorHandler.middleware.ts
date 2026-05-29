import type { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { ResponseBuilder } from "../../../shared/utils/ResponseBuilder.js";
import { logger } from "../../../setup/container/authContainer.js";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    logger.error(
        `${req.method} ${req.originalUrl}`,
        err
    );

    if (err instanceof AppError && err.isOperational) {
        return res
            .status(err.statusCode)
            .json(
                ResponseBuilder.error(err.message)
            );
    }

    console.log(`Uncaught error: ${err.message}`);

    return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(
            ResponseBuilder.error(
                MESSAGES.SERVER_ERROR
            )
        );
};