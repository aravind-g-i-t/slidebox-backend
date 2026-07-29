export interface IVerifyEmailUseCase{
    execute(email:string):Promise<Date>
}