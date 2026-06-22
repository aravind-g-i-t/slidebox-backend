import { DeleteImageUseCase } from "../../application/useCases/image/DeleteImageUseCase";
import { GetImagesUseCase } from "../../application/useCases/image/GetImagesUseCase";
import { RearrangeImagesUseCase } from "../../application/useCases/image/RearrangeImagesUseCase";
import { UpdateFileUseCase } from "../../application/useCases/image/UpdateFileUseCase";
import { UpdateTitleUseCase } from "../../application/useCases/image/UpdateTitleUseCase";
import { UploadImageUseCase } from "../../application/useCases/image/UploadImageUseCase";
import { ImageRepository } from "../../infrastructure/database/mongo/repositories/ImageRepository";
import { CloudinaryService } from "../../infrastructure/services/CloudinaryService";
import { ImageController } from "../../presentation/http/controller/ImageController";
import { logger, transactionManager } from "./authContainer";

const cloudinaryService= new CloudinaryService()

const imageRepository = new ImageRepository()

const uploadImageUseCase= new UploadImageUseCase(imageRepository,cloudinaryService)

const getImagesUseCase= new GetImagesUseCase(imageRepository)

const reArrangeImagesUseCase= new RearrangeImagesUseCase(imageRepository,transactionManager)

const updateTitleUseCase= new UpdateTitleUseCase(imageRepository)

const updateFileUseCase= new UpdateFileUseCase(imageRepository,cloudinaryService,transactionManager)

const deleteImageUseCase = new DeleteImageUseCase(imageRepository, cloudinaryService,transactionManager);

export const imageController = new ImageController(logger,uploadImageUseCase,getImagesUseCase,reArrangeImagesUseCase,updateTitleUseCase,updateFileUseCase,deleteImageUseCase);