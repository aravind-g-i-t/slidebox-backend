import type { IFileStorageService } from "../../../domain/interfaces/IFileStorageService.js";
import type { IImageRepository } from "../../../domain/interfaces/IImageRepository.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import type { IUpdateFileUseCase, UpdateFileInputDTO } from "../../iUseCases/image/IUpdateFileUseCase.js";

export class UpdateFileUseCase implements IUpdateFileUseCase {
    constructor(
        private _imageRepository:IImageRepository,
        private _fileStorageService:IFileStorageService
    ){}
    async execute(input:UpdateFileInputDTO):Promise<{imageUrl:string}>{
        const {userId,imageId,file}= input
        const image= await this._imageRepository.findById(imageId);
        if(!image){
            throw new AppError(MESSAGES.IMAGE_NOT_FOUND,STATUS_CODES.BAD_REQUEST)
        }
        if(image.userId!==userId){
            throw new AppError(MESSAGES.UNAUTHORIZED,STATUS_CODES.UNAUTHORIZED)
        }
        await this._fileStorageService.deleteImage(image.publicId);
        const uploadResult= await this._fileStorageService.uploadImage(file.path);
        if(!uploadResult){
            throw new AppError(MESSAGES.IMAGE_NOT_UPDATED,STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
        const updatedImage= await this._imageRepository.updateById(imageId,{
            imageUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id
        })
        if(!updatedImage){
            throw new AppError(MESSAGES.IMAGE_NOT_UPDATED,STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
        return { imageUrl: updatedImage.imageUrl };
    }
}