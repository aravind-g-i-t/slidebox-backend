export interface IResendOTPUseCase{
    execute(email:string):Promise<Date>
}