import type { IImageRepository } from "../../interfaces/repositories/IImageRepository";
import type { ITransactionManager } from "../../interfaces/services/ITransactionManager";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import type { IRearrangeImagesUseCase, RearrangeImagesInputDTO } from "../../interfaces/iUseCases/image/IRearrangeImages";

export class RearrangeImagesUseCase implements IRearrangeImagesUseCase {
    constructor(
        private _imageRepository: IImageRepository,
        private _transactionManager:ITransactionManager
    ) { }

    async execute(input: RearrangeImagesInputDTO): Promise<void> {

        const { draggedId, targetOrder, userId } = input;
        const draggedImage = await this._imageRepository.findById(draggedId);
        if (!draggedImage) {
            throw new AppError(MESSAGES.IMAGE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }


        if (targetOrder < 0) {
            throw new AppError(MESSAGES.INVALID_TARGET_ORDER, STATUS_CODES.BAD_REQUEST);
        }
        if (draggedImage.order === targetOrder) {
            return;
        }

        await this._transactionManager.runInTransaction(async (session) => {

            if (draggedImage.order > targetOrder) {

                await this._imageRepository.reArrangeDownwards(
                    targetOrder,
                    draggedImage.order - 1,
                    userId,
                    session
                );
            } else {
                await this._imageRepository.reArrangeDownwardss(
                    draggedImage.order + 1,
                    targetOrder,
                    userId,
                    session
                );
            }
            const updatedImage = await this._imageRepository.updateById(draggedId, { order: targetOrder },session);


            if (!updatedImage) {
                throw new AppError(MESSAGES.IMAGE_NOT_UPDATED, STATUS_CODES.NOT_FOUND);
            }
        })
    }

}