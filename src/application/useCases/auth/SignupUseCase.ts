import type { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import type { ISignupUseCase, SignupInputDTO } from "../../iUseCases/auth/ISignupUseCase";
import type { User } from "../../../domain/entities/User";
import type { ICacheService } from "../../../domain/interfaces/ICacheService";
import { generateOTP } from "../../../shared/utils/generateOTP";
import type { IEmailService } from "../../../domain/interfaces/IEmailService";
import { env } from "../../../config/env";

interface SignupData{
    name:string;
    email:string;
    phone:string;
    password:string;
}

const OTP_TTL = env.OTP_TTL_SECONDS ;
const SIGNUPDATA_TTL = env.SIGNUPDATA_TTL_SECONDS;


export class SignupUseCase implements ISignupUseCase {
    constructor(
        private _userRepository: IUserRepository,
        private _cacheService: ICacheService,
        private _emailService:IEmailService
    ) { }

    async execute(input: SignupInputDTO): Promise<{email:string; otpExpiresAt:Date}> {
        const { email } = input;

        const existingUser = await this._userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError(MESSAGES.USER_EXISTS, STATUS_CODES.BAD_REQUEST)
        }

        const otp = generateOTP();
        await this._emailService.send(
            email,
            'Slide Box OTP verification',
            `Your OTP for Slide Box account is ${otp}`
        );
        const otpKey = `${email}:otp`;
        const signupDataKey = `${email}:signup`;
        await this._cacheService.set<SignupData>(signupDataKey, input, SIGNUPDATA_TTL);
        await this._cacheService.set<string>(otpKey, otp, OTP_TTL);
        const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000)
        return { email, otpExpiresAt }
    }
}