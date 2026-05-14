import type { IFileStorageService } from "../../domain/interfaces/IFileStorageService.js";
import cloudinary from "./cloudinaryConfig.js";

export class CloudinaryService implements IFileStorageService {
    async uploadImage(filePath: string) {
        
        const result= await cloudinary.uploader.upload(
            filePath,
            {
                folder: "image-gallery-app",
            }
        );
        return result
        
    }

    async deleteImage(
        publicId: string
    ): Promise<void> {
        await cloudinary.uploader.destroy(publicId);
    }

}