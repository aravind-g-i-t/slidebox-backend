import type { ICacheService } from "../../interfaces/services/ICacheService";
import type { IUserRepository } from "../../interfaces/services/IUserRepository";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import { hashPassword } from "../../../shared/utils/hash";
import type { IVerifyOTPUseCase } from "../../interfaces/iUseCases/auth/IVerifyOTPUseCase";

interface SignupData{
    name:string;
    phone:string;
    email:string;
    password:string;
}

export class VerifyOTPUseCase implements IVerifyOTPUseCase{
    constructor(
        private _cacheService: ICacheService,
        private _userRepository: IUserRepository
    ) { }

    async execute(input: {otp:string,email:string}): Promise<void> {
        const { email, otp } = input;
        const userOTP = await this._cacheService.get<string>(`${email}:otp`)        
        if (!userOTP) {
            throw new AppError(MESSAGES.OTP_EXPIRED, STATUS_CODES.GONE)

        }
        if (otp !== userOTP) {
            throw new AppError(MESSAGES.INVALID_OTP, STATUS_CODES.UNAUTHORIZED)
        }

        const user = await this._cacheService.get<SignupData>(`${email}:signup`)
        if (!user) {
            throw new AppError(MESSAGES.SIGNUP_TIMEOUT, STATUS_CODES.REQUEST_TIMEOUT)

        }

        const hashedPassword= await hashPassword(user.password);

        const learnerCreated = await this._userRepository.create({
            email: user.email,
            name: user.name,
            password: hashedPassword,
            phone: user.phone
        })
        if(!learnerCreated){
            throw new AppError(MESSAGES.USER_NOT_CREATED,STATUS_CODES.BAD_REQUEST);
        }
    }
}