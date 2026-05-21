import type { Image } from "../../domain/entities/Image.js";
import type { ImageForDisplay } from "../iUseCases/image/IGetImagesUseCase.js";

export class ImageMapper {
    static toImageForDisplay(image: Image): ImageForDisplay {
        return {
            id: image.id,
            title: image.title,
            imageUrl: image.imageUrl,
            order: image.order,
            createdAt: image.createdAt
        }
    }
}