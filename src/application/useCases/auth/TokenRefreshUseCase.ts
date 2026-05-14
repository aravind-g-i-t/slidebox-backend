import type { ITokenService } from "../../../domain/interfaces/ITokenService.js";
import type { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import type { ITokenRefreshUseCase } from "../../iUseCases/auth/ITokenRefreshUseCase.js";

type TokenPayload={
    id:string,
    iat?:number,
    exp?:number
}
export class TokenRefreshUseCase implements ITokenRefreshUseCase{
    constructor(
        private _tokenService:ITokenService,
        private _userRepository:IUserRepository,
    ){}

    async execute(refreshToken:string):Promise<string>{
        
        const payload:TokenPayload=await this._tokenService.verifyRefreshToken(refreshToken);

       
            const user=await this._userRepository.findById(payload.id);
            if(!user){
                throw new AppError(MESSAGES.NOT_FOUND,STATUS_CODES.NOT_FOUND);
            }


        const accessToken=this._tokenService.generateAccessToken({id:payload.id});
        return accessToken;
    }
}