import { DeleteImageUseCase } from "../../application/useCases/image/DeleteImageUseCase.js";
import { GetImagesUseCase } from "../../application/useCases/image/GetImagesUseCase.js";
import { RearrangeImagesUseCase } from "../../application/useCases/image/RearrangeImagesUseCase.js";
import { UpdateFileUseCase } from "../../application/useCases/image/UpdateFileUseCase.js";
import { UpdateTitleUseCase } from "../../application/useCases/image/UpdateTitleUseCase.js";
import { UploadImageUseCase } from "../../application/useCases/image/UploadImageUseCase.js";
import { ImageRepository } from "../../infrastructure/database/mongo/repositories/ImageRepository.js";
import { CloudinaryService } from "../../infrastructure/services/CloudinaryService.js";
import { ImageController } from "../../presentation/http/controller/ImageController.js";
import { logger } from "./authContainer.js";

const cloudinaryService= new CloudinaryService()

const imageRepository = new ImageRepository()

const uploadImageUseCase= new UploadImageUseCase(imageRepository,cloudinaryService)

const getImagesUseCase= new GetImagesUseCase(imageRepository)

const reArrangeImagesUseCase= new RearrangeImagesUseCase(imageRepository)

const updateTitleUseCase= new UpdateTitleUseCase(imageRepository)

const updateFileUseCase= new UpdateFileUseCase(imageRepository,cloudinaryService)

const deleteImageUseCase = new DeleteImageUseCase(imageRepository, cloudinaryService);

export const imageController = new ImageController(logger,uploadImageUseCase,getImagesUseCase,reArrangeImagesUseCase,updateTitleUseCase,updateFileUseCase,deleteImageUseCase);