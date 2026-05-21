import type { ImageForDisplay } from "./IGetImagesUseCase.js";


interface FileData {
    path: string;
    mimetype: string;
    originalname: string;

}
export interface UploadImageInputDTO {
    userId: string;
    metadatas: {title:string}[];
    files:FileData[]
}


export interface IUploadImageUseCase {
    execute(input:UploadImageInputDTO):Promise<ImageForDisplay[]>
}