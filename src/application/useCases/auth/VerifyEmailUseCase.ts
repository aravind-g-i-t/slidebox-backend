import type { ICacheService } from "../../interfaces/services/ICacheService";
import type { IEmailService } from "../../interfaces/services/IEmailService";
import type { IUserRepository } from "../../interfaces/services/IUserRepository";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import { generateOTP } from "../../../shared/utils/generateOTP";
import dotenv from "dotenv";
import type { IVerifyEmailUseCase } from "../../interfaces/iUseCases/auth/IVerifyEmailUseCase";
import { env } from "../../../config/env";
dotenv.config()


const OTP_TTL = env.OTP_TTL_SECONDS;


export class VerifyEmailUseCase implements IVerifyEmailUseCase{
    constructor(
        private _userRepository:IUserRepository,
        private _emailService:IEmailService,
        private _cacheService:ICacheService
    ){}

    async execute(email: string): Promise<Date> {
        const user= await this._userRepository.findByEmail(email)
       
        if(!user){
            throw new AppError(MESSAGES.NO_ACCOUNT,STATUS_CODES.NOT_FOUND)
        }
        const cacheKey=`${email}:otp`;
            const otp=generateOTP();
            await this._emailService.send(
                email,
                'Slidebox OTP verification',
                `Your OTP for Slidebox account is ${otp}`
            );
            await this._cacheService.set<string>(cacheKey,otp,OTP_TTL);
            const otpExpiresAt=new Date(Date.now() + 2 * 60 * 1000)
            
            return otpExpiresAt;
    }

}