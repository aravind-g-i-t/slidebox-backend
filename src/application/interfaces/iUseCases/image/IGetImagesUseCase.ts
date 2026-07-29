export interface ImageForDisplay {
    id: string;
    title: string;
    imageUrl: string;
    order: number;
    createdAt: Date;
}

export interface GetImagesOutputDTO{
    totalCount:number;
    images:ImageForDisplay[]
}

export interface GetImagesInputDTO{
    userId:string;
    skip:number;
    limit:number;
}


export interface IGetImagesUseCase{
    execute(input:GetImagesInputDTO):Promise<GetImagesOutputDTO>
}