import type { IFileStorageService } from "../../../domain/interfaces/IFileStorageService.js";
import type { IImageRepository } from "../../../domain/interfaces/IImageRepository.js";
import type { UploadImageInputDTO } from "../../iUseCases/image/IUploadImageUseCase.js";

export class UploadImageUseCase {
    constructor(
        private _imageRepository: IImageRepository,
        private _fileStorageService: IFileStorageService
    ) { }

    async execute(data: UploadImageInputDTO) {
        const uploadedImages = [];
        if (data.files.length !== data.metadatas.length) {
            throw new Error(
                "Each image must have a title"
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

        return images.map(image => {
                return {
                    id: image.id,
                    title: image.title,
                    imageUrl: image.imageUrl,
                    order: image.order,
                    createdAt: image.createdAt
                }
            }).reverse()
    }
}