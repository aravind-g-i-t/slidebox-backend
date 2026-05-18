export interface IVerifyResetOTPUseCase {
    execute(input: {email:string,otp:string}):Promise<{resetToken:string}>   
}