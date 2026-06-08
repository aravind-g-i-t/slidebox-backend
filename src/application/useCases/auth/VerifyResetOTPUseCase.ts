import type { ICacheService } from "../../../domain/interfaces/ICacheService";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import { generateToken } from "../../../shared/utils/generateToken";
import type { IVerifyResetOTPUseCase } from "../../iUseCases/auth/IVerifyResetOTPUseCase";



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