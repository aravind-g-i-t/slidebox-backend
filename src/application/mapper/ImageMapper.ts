import type { Image } from "../../domain/entities/Image";
import type { ImageForDisplay } from "../interfaces/iUseCases/image/IGetImagesUseCase";

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