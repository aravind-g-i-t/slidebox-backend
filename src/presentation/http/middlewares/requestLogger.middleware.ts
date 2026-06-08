import type { Request,Response,NextFunction } from "express";
import { logger } from "../../../setup/container/authContainer";

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = Date.now();

    res.on("finish", () => {
        logger.info(
            `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`
        );
    });

    next();
};