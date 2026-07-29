import type { IImageRepository } from "../../interfaces/repositories/IImageRepository";
import type { GetImagesInputDTO, GetImagesOutputDTO, IGetImagesUseCase } from "../../interfaces/iUseCases/image/IGetImagesUseCase";
import { ImageMapper } from "../../mapper/ImageMapper";

export class GetImagesUseCase implements IGetImagesUseCase {
    constructor(
        private _imageRepository: IImageRepository
    ) { }

    async execute(input: GetImagesInputDTO): Promise<GetImagesOutputDTO> {
        const { userId, skip, limit } = input;

        const { images, totalCount } = await this._imageRepository.findByUserId({
            userId,
            skip,
            limit
        })

        return {
            totalCount,
            images: images.map(image => ImageMapper.toImageForDisplay(image))
        }
    }
}