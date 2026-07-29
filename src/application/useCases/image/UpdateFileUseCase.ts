import type { IFileStorageService } from "../../interfaces/services/IFileStorageService";
import type { IImageRepository } from "../../interfaces/repositories/IImageRepository";
import type { ITransactionManager } from "../../interfaces/services/ITransactionManager";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import type { IUpdateFileUseCase, UpdateFileInputDTO } from "../../interfaces/iUseCases/image/IUpdateFileUseCase";

export class UpdateFileUseCase implements IUpdateFileUseCase {
    constructor(
        private _imageRepository: IImageRepository,
        private _fileStorageService: IFileStorageService,
        private _transactionManager: ITransactionManager
    ) { }
    async execute(input: UpdateFileInputDTO): Promise<{ imageUrl: string }> {
        const { userId, imageId, file } = input;

        const image = await this._imageRepository.findById(imageId);

        if (!image) {
            throw new AppError(
                MESSAGES.IMAGE_NOT_FOUND,
                STATUS_CODES.NOT_FOUND
            );
        }

        if (image.userId !== userId) {
            throw new AppError(
                MESSAGES.UNAUTHORIZED,
                STATUS_CODES.UNAUTHORIZED
            );
        }

        const uploadResult = await this._fileStorageService.uploadImage(file.path);

        if (!uploadResult) {
            throw new AppError(
                MESSAGES.IMAGE_NOT_UPDATED,
                STATUS_CODES.INTERNAL_SERVER_ERROR
            );
        }

        try {
            const updatedImage = await this._transactionManager.runInTransaction(
                async (session) => {
                    const result = await this._imageRepository.updateById(
                        imageId,
                        {
                            imageUrl: uploadResult.secure_url,
                            publicId: uploadResult.public_id,
                        },
                        session
                    );

                    if (!result) {
                        throw new AppError(
                            MESSAGES.IMAGE_NOT_UPDATED,
                            STATUS_CODES.INTERNAL_SERVER_ERROR
                        );
                    }

                    return result;
                }
            );

            try {
                await this._fileStorageService.deleteImage(image.publicId);
            } catch (error) {
                console.error(
                    `Failed to delete old image: ${image.publicId}`,
                    error
                );
            }

            return {
                imageUrl: updatedImage.imageUrl,
            };
        } catch (error) {
            try {
                await this._fileStorageService.deleteImage(
                    uploadResult.public_id
                );
            } catch (cleanupError) {
                console.error(
                    `Failed to cleanup uploaded image: ${uploadResult.public_id}`,
                    cleanupError
                );
            }

            throw error;
        }
    }
}