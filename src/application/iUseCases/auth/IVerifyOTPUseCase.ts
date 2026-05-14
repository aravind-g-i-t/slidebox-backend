export interface IVerifyOTPUseCase {
    execute(input: {email:string,otp:string}):Promise<void>   
}