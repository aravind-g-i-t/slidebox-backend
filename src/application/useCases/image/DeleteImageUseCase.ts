import type { IFileStorageService } from "../../../domain/interfaces/IFileStorageService.js";
import type { IImageRepository } from "../../../domain/interfaces/IImageRepository.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import type { IDeleteImageUseCase } from "../../iUseCases/image/IDeleteImageUseCase.js";

export class DeleteImageUseCase implements IDeleteImageUseCase{
    constructor(
        private imageRepository:IImageRepository,
        private fileStorageService:IFileStorageService
    ){}
    async execute(imageId:string,userId:string):Promise<void>{
        const image= await this.imageRepository.findById(imageId);
        if(!image){
            throw new AppError(MESSAGES.IMAGE_NOT_FOUND,STATUS_CODES.BAD_REQUEST)
        }
        if(image.userId!==userId){
            throw new AppError(MESSAGES.UNAUTHORIZED,STATUS_CODES.UNAUTHORIZED)
        }
        await this.imageRepository.shiftOrdersDownFrom(image.order + 1, userId);

        await this.fileStorageService.deleteImage(image.publicId);
        await this.imageRepository.deleteById(imageId); 
    }
}