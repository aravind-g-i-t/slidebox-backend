import jwt ,  { type SignOptions} from 'jsonwebtoken';
import type { ITokenService } from '../../domain/interfaces/ITokenService.js';
import { AppError } from '../../shared/errors/AppError.js';
import { MESSAGES } from '../../shared/constants/messages.js';
import { STATUS_CODES } from '../../shared/constants/httpStatus.js';
import dotenv from "dotenv"
dotenv.config()


const accessTokenMaxAge = (process.env.ACCESS_TOKEN_MAX_AGE as SignOptions["expiresIn"]|| "15m") 
const refreshTokenMaxAge = (process.env.REFRESH_TOKEN_MAX_AGE as SignOptions["expiresIn"]|| "7d") 




export class JWTService implements ITokenService {
    constructor(
        private readonly accessSecret: string = process.env.JWT_ACCESS_SECRET || 'tempaccesssecret',
        private readonly refreshSecret: string = process.env.JWT_REFRESH_SECRET || 'temprefreshsecret',
    ) { }

    async generateAccessToken(payload: object): Promise<string> {
        
        const token= jwt.sign(payload, this.accessSecret, { expiresIn: accessTokenMaxAge });
        if(!token){
            throw new AppError(MESSAGES.ACCESS_TOKEN_NOT_CREATED,STATUS_CODES.SERVICE_UNAVAILABLE,false)
        }
        return token
    }


    async generateRefreshToken(payload: object): Promise<string> {
        
        const token= jwt.sign(payload, this.refreshSecret, { expiresIn: refreshTokenMaxAge });
        if(!token){
            throw new AppError(MESSAGES.REFRESH_TOKEN_NOT_CREATED,STATUS_CODES.SERVICE_UNAVAILABLE,false)
        }
        return token;
    }

    async verifyAccessToken<T>(token: string): Promise<T> {
        
        try {
            
            const result= jwt.verify(token, this.accessSecret) as T;
            
            return result;
        } catch{
            
            throw new AppError(MESSAGES.INVALID_TOKEN,STATUS_CODES.UNAUTHORIZED);
        }
    }

    

    async verifyRefreshToken<T>(token: string): Promise<T> {

        try {
            return jwt.verify(token, this.refreshSecret) as T;
        } catch {
            throw new AppError(MESSAGES.INVALID_REFRESH_TOKEN,STATUS_CODES.BAD_REQUEST);
        }
    }


}
