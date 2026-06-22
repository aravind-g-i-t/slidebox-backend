import mongoose from "mongoose";
import type { ITransactionManager } from "../../../domain/interfaces/ITransactionManager";
import { AppError } from "../../../shared/errors/AppError";
import { MESSAGES } from "../../../shared/constants/messages";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";

export class MongoTransactionManager implements ITransactionManager {
    async runInTransaction<T>(work: (session: any) => Promise<T>): Promise<T> {
        const session = await mongoose.startSession();
        try {
            let result: T;
            await session.withTransaction(async () => {
                result = await work(session);
            });
            return result!;
        } catch (error) {
            console.log("Transaction aborted dut to error", error);
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(MESSAGES.TRANSACTION_FAILED, STATUS_CODES.INTERNAL_SERVER_ERROR)
        } finally {
            session.endSession();
        }
    }
}