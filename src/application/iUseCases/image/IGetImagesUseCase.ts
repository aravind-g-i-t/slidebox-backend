export interface Image {
    id: string;
    title: string;
    imageUrl: string;
    order: number;
    createdAt: Date;
}

export interface GetImagesOutputDTO{
    totalCount:number;
    images:Image[]
}

export interface GetImagesInputDTO{
    userId:string;
    skip:number;
    limit:number;
}


export interface IGetImagesUseCase{
    execute(input:GetImagesInputDTO):Promise<GetImagesOutputDTO>
}