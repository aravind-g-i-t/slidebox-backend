import type { ICacheService } from "../../../domain/interfaces/ICacheService";
import type { IEmailService } from "../../../domain/interfaces/IEmailService";

import { generateOTP } from "../../../shared/utils/generateOTP";
import dotenv from "dotenv";
import type { IResendOTPUseCase } from "../../iUseCases/auth/IResendOTPUseCase";
import { env } from "../../../config/env";
dotenv.config()


const OTP_TTL = env.OTP_TTL_SECONDS


export class ResendOTPUseCase implements IResendOTPUseCase{
    constructor(
        private _emailService:IEmailService,
        private _cacheService:ICacheService
    ){}

    async execute(email: string): Promise<Date> {
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