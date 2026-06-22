import type { IFileStorageService } from "../../../domain/interfaces/IFileStorageService";
import type { IImageRepository } from "../../../domain/interfaces/IImageRepository";
import type { ITransactionManager } from "../../../domain/interfaces/ITransactionManager";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import type { IDeleteImageUseCase } from "../../iUseCases/image/IDeleteImageUseCase";

export class DeleteImageUseCase implements IDeleteImageUseCase{
    constructor(
        private _imageRepository:IImageRepository,
        private _fileStorageService:IFileStorageService,
        private _transactionManager: ITransactionManager
    ){}
    async execute(imageId:string,userId:string):Promise<void>{
        const image= await this._imageRepository.findById(imageId);
        if(!image){
            throw new AppError(MESSAGES.IMAGE_NOT_FOUND,STATUS_CODES.BAD_REQUEST)
        }
        if(image.userId!==userId){
            throw new AppError(MESSAGES.UNAUTHORIZED,STATUS_CODES.UNAUTHORIZED)
        }

        await this._transactionManager.runInTransaction(async (session)=>{

            await this._imageRepository.shiftOrdersDownFrom(image.order + 1, userId,session);
            await this._imageRepository.deleteById(imageId,session); 
        });

        await this._fileStorageService.deleteImage(image.publicId);
    }
}