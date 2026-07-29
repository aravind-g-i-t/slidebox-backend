export interface SigninInputDTO {
    email: string;
    password: string;
}

export interface SigninOutputDTO {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: Date;
    }
}

export interface ISigninUseCase {
    execute(input: SigninInputDTO): Promise<SigninOutputDTO>
}