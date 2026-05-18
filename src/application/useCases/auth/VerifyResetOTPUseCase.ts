import type { ICacheService } from "../../../domain/interfaces/ICacheService.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { generateToken } from "../../../shared/utils/generateToken.js";
import type { IVerifyResetOTPUseCase } from "../../iUseCases/auth/IVerifyResetOTPUseCase.js";



export class VerifyResetOTPUseCase implements IVerifyResetOTPUseCase{
    constructor(
        private _cacheService: ICacheService,
    ) { }

    async execute(input: {otp:string,email:string}): Promise<{resetToken:string}> {
        
        const { email, otp } = input;
        const userOTP = await this._cacheService.get<string>(`${email}:otp`);
        
        if (!userOTP) {
            throw new AppError(MESSAGES.OTP_EXPIRED, STATUS_CODES.GONE)

        }
        if (otp !== userOTP) {
            throw new AppError(MESSAGES.INVALID_OTP, STATUS_CODES.UNAUTHORIZED)
        }
        const resetToken=generateToken();
        
        

        const tokenKey=`reset_token:${resetToken}`        

        await this._cacheService.set<string>(tokenKey, email, 600);
        return {resetToken}
    }
}