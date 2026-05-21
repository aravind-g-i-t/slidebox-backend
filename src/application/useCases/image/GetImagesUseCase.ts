import type { IImageRepository } from "../../../domain/interfaces/IImageRepository.js";
import type { GetImagesInputDTO, GetImagesOutputDTO, IGetImagesUseCase } from "../../iUseCases/image/IGetImagesUseCase.js";
import { ImageMapper } from "../../mapper/ImageMapper.js";

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