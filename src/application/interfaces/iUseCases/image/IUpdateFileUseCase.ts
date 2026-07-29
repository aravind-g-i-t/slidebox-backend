interface FileData {
    path: string;
    mimetype: string;
    originalname: string;

}

export interface UpdateFileInputDTO {
    imageId: string;
    userId: string;
    file: FileData;
}

export interface IUpdateFileUseCase {
    execute(input: UpdateFileInputDTO): Promise<{imageUrl:string}>;
}