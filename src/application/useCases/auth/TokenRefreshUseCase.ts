import type { ITokenService } from "../../interfaces/services/ITokenService";
import type { IUserRepository } from "../../interfaces/services/IUserRepository";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import type { ITokenRefreshUseCase } from "../../interfaces/iUseCases/auth/ITokenRefreshUseCase";

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