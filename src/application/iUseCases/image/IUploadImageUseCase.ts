export interface Image {
    id: string;
    title: string;
    imageUrl: string;
    order: number;
    createdAt: Date;
}

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
    execute(input:UploadImageInputDTO):Promise<Image[]>
}