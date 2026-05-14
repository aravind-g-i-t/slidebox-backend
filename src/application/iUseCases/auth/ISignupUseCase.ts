
export interface SignupInputDTO{
    name:string;
    email:string;
    phone:string;
    password:string;
}

export interface ISignupUseCase{
    execute(input:SignupInputDTO):Promise<{email:string; otpExpiresAt:Date}>
}