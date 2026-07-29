import type { IFileStorageService } from "../../application/interfaces/services/IFileStorageService";
import cloudinary from "./cloudinaryConfig";

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