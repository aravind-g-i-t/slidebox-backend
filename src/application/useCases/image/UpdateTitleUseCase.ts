import type { IImageRepository } from "../../../domain/interfaces/IImageRepository";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import type { IUpdateTitleUseCase } from "../../iUseCases/image/IUpdateTitleUseCase";

export class UpdateTitleUseCase implements IUpdateTitleUseCase{
    constructor(
        private _imageRepository:IImageRepository
    ){}

    async execute(input: { userId: string; imageId: string; title: string; }): Promise<void> {
        const {userId,imageId,title}= input
        const image= await this._imageRepository.findById(imageId);
        
        if(!image){
            throw new AppError(MESSAGES.IMAGE_NOT_FOUND,STATUS_CODES.BAD_REQUEST)
        }

        if(image.userId!==userId){
            throw new AppError(MESSAGES.UNAUTHORIZED,STATUS_CODES.UNAUTHORIZED)
        }

        const updatedImage= await this._imageRepository.updateById(imageId,{title});

        if(!updatedImage){
            throw new AppError(MESSAGES.IMAGE_NOT_UPDATED,STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }
}