import type { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { ResponseBuilder } from "../../../shared/utils/ResponseBuilder.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import type { IUploadImageUseCase } from "../../../application/iUseCases/image/IUploadImageUseCase.js";
import { AppError } from "../../../shared/errors/AppError.js";
import type { IGetImagesUseCase } from "../../../application/iUseCases/image/IGetImagesUseCase.js";
import type { IRearrangeImagesUseCase } from "../../../application/iUseCases/image/IRearrangeImages.js";
import type { IUpdateTitleUseCase } from "../../../application/iUseCases/image/IUpdateTitleUseCase.js";
import type { IUpdateFileUseCase } from "../../../application/iUseCases/image/IUpdateFileUseCase.js";
import type { IDeleteImageUseCase } from "../../../application/iUseCases/image/IDeleteImageUseCase.js";

export class ImageController {
    constructor(
        private _uploadImageUseCase: IUploadImageUseCase,
        private _getImagesUseCase: IGetImagesUseCase,
        private _reArrangeImagesUseCase: IRearrangeImagesUseCase,
        private _updateTitleUseCase: IUpdateTitleUseCase,
        private _updateFileUseCase: IUpdateFileUseCase,
                private _deleteImageUseCase: IDeleteImageUseCase

    ) { }

    async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[];
            console.log(req.files);


            const metadatas: { title: string }[] =
                JSON.parse(req.body.metadatas);

            if (!files || files.length === 0) {
                throw new AppError("No files uploaded", 400)
            }

            const mappedFiles = files.map((file) => ({
                path: file.path,
                mimetype: file.mimetype,
                originalname: file.originalname,
            }));

            const images =
                await this._uploadImageUseCase.execute({
                    userId: req.user?.id!,
                    metadatas,
                    files: mappedFiles,
                });

            res.status(STATUS_CODES.CREATED).json(ResponseBuilder.success(MESSAGES.USER_CREATED, {
                images
            }))
        } catch (error) {
            next(error)
        }
    }

    async getImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            


            const {skip,limit}= req.query;

            const result =
                await this._getImagesUseCase.execute({
                    userId: req.user?.id!,
                    skip:Number(skip),
                    limit: Number(limit),
                });

            res.status(STATUS_CODES.OK).json(ResponseBuilder.success(MESSAGES.IMAGES_FETCHED, result))
        } catch (error) {
            next(error)
        }
    }

    async reArrangeImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {draggedId,targetOrder}= req.body;
            await this._reArrangeImagesUseCase.execute({
                draggedId,
                targetOrder,
                userId:req.user?.id!
            });
            res.status(STATUS_CODES.OK).json(ResponseBuilder.success(MESSAGES.IMAGES_REARRANGED))
        } catch (error) {
            next(error)
        }   
    }

    async updateTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {imageId} = req.params;
            const {title} = req.body;

            await this._updateTitleUseCase.execute({
                userId:req.user?.id!,
                imageId: String(imageId),
                title
            });

            res.status(STATUS_CODES.OK).json(ResponseBuilder.success(MESSAGES.IMAGE_UPDATED))
        } catch (error) {
            next(error)
        }
    }

    async updateImageFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {imageId} = req.params;
            const file = req.file as Express.Multer.File;
            const result= await this._updateFileUseCase.execute({
                userId:req.user?.id!,
                imageId: String(imageId),
                file:{
                    path: file.path,
                    mimetype: file.mimetype,
                    originalname: file.originalname
                }
            });
            res.status(STATUS_CODES.OK).json(ResponseBuilder.success(MESSAGES.IMAGE_UPDATED, result))
        } catch (error) {
            next(error)
        }
    }

    async deleteImage (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {imageId} = req.params;

            await this._deleteImageUseCase.execute(String(imageId), req.user?.id!);
            res.status(STATUS_CODES.OK).json(ResponseBuilder.success(MESSAGES.IMAGE_DELETED))
        } catch (error) {
            next(error)
        }   
    }
}