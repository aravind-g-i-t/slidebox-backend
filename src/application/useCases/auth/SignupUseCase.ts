import type { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import type { ISignupUseCase, SignupInputDTO } from "../../iUseCases/auth/ISignupUseCase.js";
import type { User } from "../../../domain/entities/User.js";
import type { ICacheService } from "../../../domain/interfaces/ICacheService.js";
import { generateOTP } from "../../../shared/utils/generateOTP.js";
import type { IEmailService } from "../../../domain/interfaces/IEmailService.js";

interface SignupData{
    name:string;
    email:string;
    phone:string;
    password:string;
}

const OTP_TTL = parseInt(process.env.OTP_TTL_SECONDS || "120", 10);
const SIGNUPDATA_TTL = parseInt(process.env.SIGNUPDATA_TTL_SECONDS || "600", 10);


export class SignupUseCase implements ISignupUseCase {
    constructor(
        private _userRepository: IUserRepository,
        private _cacheService: ICacheService,
        private _emailService:IEmailService
    ) { }

    async execute(input: SignupInputDTO): Promise<{email:string; otpExpiresAt:Date}> {
        const { name, email, phone, password } = input;

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