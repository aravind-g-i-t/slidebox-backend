export interface IDeleteImageUseCase{
    execute(imageId:string,userId:string):Promise<void>
}