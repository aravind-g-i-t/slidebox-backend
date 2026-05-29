import winston from "winston";
import type { ILogger } from "../../domain/interfaces/ILogger.js";

export class WinstonLogger implements ILogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({
                    filename: "logs/error.log",
                    level: "error",
                }),
                new winston.transports.File({
                    filename: "logs/combined.log",
                }),
            ],
        });

        this.logger.add(
            new winston.transports.Console({
                format: winston.format.simple(),
            })
        );
    }

    info(message: string): void {
        this.logger.info(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    error(message: string, error?: unknown): void {
        this.logger.error(message, { error });
    }
}