
export interface ITokenRefreshUseCase{
    execute(refreshToken:string):Promise<string>
}
