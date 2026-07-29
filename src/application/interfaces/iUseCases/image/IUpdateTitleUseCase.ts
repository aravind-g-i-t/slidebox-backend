export interface IUpdateTitleUseCase{
    execute(input:{userId: string; imageId:string;title:string}):Promise<void>
}