import type { ICacheService } from "../../../domain/interfaces/ICacheService.js";
import type { IEmailService } from "../../../domain/interfaces/IEmailService.js";
import type { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { generateOTP } from "../../../shared/utils/generateOTP.js";
import type { IVerifyEmailUseCase } from "../../iUseCases/auth/IVerifyEmailUseCase.js";

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
            await this._cacheService.set<string>(cacheKey,otp,120);
            const otpExpiresAt=new Date(Date.now() + 2 * 60 * 1000)
            
            return otpExpiresAt;
    }

}