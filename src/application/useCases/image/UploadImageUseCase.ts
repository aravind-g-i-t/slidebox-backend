import type { IFileStorageService } from "../../../domain/interfaces/IFileStorageService";
import type { IImageRepository } from "../../../domain/interfaces/IImageRepository";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import type { ImageForDisplay } from "../../iUseCases/image/IGetImagesUseCase";
import type { IUploadImageUseCase, UploadImageInputDTO } from "../../iUseCases/image/IUploadImageUseCase";
import { ImageMapper } from "../../mapper/ImageMapper";

export class UploadImageUseCase implements IUploadImageUseCase {
    constructor(
        private _imageRepository: IImageRepository,
        private _fileStorageService: IFileStorageService
    ) { }

    async execute(data: UploadImageInputDTO):Promise<ImageForDisplay[]> {
        const uploadedImages = [];
        if (data.files.length !== data.metadatas.length) {
            throw new AppError(
                MESSAGES.NO_TITLE,
                STATUS_CODES.BAD_REQUEST
            );
        }
        
        const lastOrder =
            await this._imageRepository.getLastOrder(
                data.userId
            );
        
        for (let i = 0; i < data.files.length; i++) {
            const file = data.files[i]!;
            
            const uploadResult =
                await this._fileStorageService.uploadImage(
                    file?.path
                );
            

            uploadedImages.push({
                userId: data.userId,

                title: data.metadatas[i]?.title!,

                imageUrl: uploadResult.secure_url,

                publicId: uploadResult.public_id,

                order: lastOrder + i + 1,
            });
        }
        

        const images= await this._imageRepository.createMany(
            uploadedImages
        );

        return images.map(image => ImageMapper.toImageForDisplay(image)).reverse();
    }
}