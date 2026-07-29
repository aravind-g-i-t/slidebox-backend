export interface RearrangeImagesInputDTO{
    draggedId:string;
    targetOrder:number;
    userId:string;
}


export interface IRearrangeImagesUseCase{
    execute(input:RearrangeImagesInputDTO):Promise<void>
}