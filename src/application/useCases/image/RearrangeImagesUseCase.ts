import type { IImageRepository } from "../../../domain/interfaces/IImageRepository.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import type { IRearrangeImagesUseCase, RearrangeImagesInputDTO } from "../../iUseCases/image/IRearrangeImages.js";

export class RearrangeImagesUseCase implements IRearrangeImagesUseCase {
    constructor(
        private _imageRepository: IImageRepository,
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
        if (draggedImage.order > targetOrder) {

            await this._imageRepository.reArrangeDownwards(
                targetOrder,
                draggedImage.order - 1,
                userId
            );
        } else {
            await this._imageRepository.reArrangeDownwardss(
                draggedImage.order + 1,
                targetOrder,
                userId
            );
        }
        const updatedImage = await this._imageRepository.updateById(draggedId, { order: targetOrder });


        if (!updatedImage) {
            throw new AppError(MESSAGES.IMAGE_NOT_UPDATED, STATUS_CODES.NOT_FOUND);
        }
    }

}