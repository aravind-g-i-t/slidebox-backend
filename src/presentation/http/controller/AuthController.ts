import type { ISignupUseCase } from "../../../application/iUseCases/auth/ISignupUseCase.js";
import type { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { ResponseBuilder } from "../../../shared/utils/ResponseBuilder.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import type { ISigninUseCase } from "../../../application/iUseCases/auth/ISigninUseCase.js";
import type { IVerifyOTPUseCase } from "../../../application/iUseCases/auth/IVerifyOTPUseCase.js";
import { AppError } from "../../../shared/errors/AppError.js";
import type { ITokenRefreshUseCase } from "../../../application/iUseCases/auth/ITokenRefreshUseCase.js";
import type { IVerifyResetOTPUseCase } from "../../../application/iUseCases/auth/IVerifyResetOTPUseCase.js";
import type { IResetPasswordUseCase } from "../../../application/iUseCases/auth/IResetPasswordUseCase.js";
import type { IVerifyEmailUseCase } from "../../../application/iUseCases/auth/IVerifyEmailUseCase.js";
import type { IResendOTPUseCase } from "../../../application/iUseCases/auth/IResendOTPUseCase.js";

export class AuthController {
    constructor(
        private _signupUseCase: ISignupUseCase,
        private _verifyOTPUseCase: IVerifyOTPUseCase,
        private _signinUseCase: ISigninUseCase,
        private _tokenRefreshUseCase: ITokenRefreshUseCase,
        private _verifyEmailUseCase: IVerifyEmailUseCase,
        private _verifyResetOTPUseCase: IVerifyResetOTPUseCase,
        private _resetPasswordUseCase: IResetPasswordUseCase,
        private _resendOTPUseCase: IResendOTPUseCase
    ) { }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, phone, password } = req.body;

            const result = await this._signupUseCase.execute({
                name,
                email,
                phone,
                password
            });

            res.status(STATUS_CODES.CREATED).json(ResponseBuilder.success(MESSAGES.USER_CREATED, result))
        } catch (error) {
            next(error)
        }
    }

    verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, otp } = req.body;


            await this._verifyOTPUseCase.execute({ email, otp });
            res.status(STATUS_CODES.CREATED).json(
                ResponseBuilder.success(MESSAGES.ACCOUNT_CREATED_SUCCESS)
            );
            return;


        } catch (error) {
            next(error);
        }
    };

    resendOTP = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;


            const result = await this._resendOTPUseCase.execute(email);
            res.status(STATUS_CODES.CREATED).json(
                ResponseBuilder.success(MESSAGES.OTP_SENT, {
                    otpExpiresAt: result
                })
            );


        } catch (error) {
            next(error);
        }
    };


    async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            const result = await this._signinUseCase.execute({
                email,
                password
            });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })

            res.status(STATUS_CODES.OK).json(ResponseBuilder.success(MESSAGES.USER_CREATED, {
                user: result.user
            }))
        } catch (error) {
            next(error)
        }
    }

    logout = async (req: Request, res: Response) => {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");

        res.status(STATUS_CODES.OK).json(
            ResponseBuilder.success(MESSAGES.LOGOUT_SUCCESS)
        );
    };

    tokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                throw new AppError(MESSAGES.SESSION_EXPIRED, STATUS_CODES.BAD_REQUEST);
            }

            const accessToken = await this._tokenRefreshUseCase.execute(refreshToken);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });

            res.status(STATUS_CODES.OK).json(
                ResponseBuilder.success(MESSAGES.REFRESH_TOKEN_SUCCESS, { accessToken })
            );
        } catch (error) {
            next(error);
        }
    };

    verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;


            const result = await this._verifyEmailUseCase.execute( email );
            res.status(STATUS_CODES.CREATED).json(
                ResponseBuilder.success(MESSAGES.OTP_SENT, {
                    otpExpiresAt: result
                })
            );


        } catch (error) {
            next(error);
        }
    };


    verifyResetOTP = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, otp } = req.body;


            const result = await this._verifyResetOTPUseCase.execute({ email, otp });
            res.status(STATUS_CODES.CREATED).json(
                ResponseBuilder.success(MESSAGES.OTP_VERIFIED, result)
            );


        } catch (error) {
            next(error);
        }
    };

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { resetToken, password } = req.body;


            await this._resetPasswordUseCase.execute({ resetToken, newPassword: password });
            res.status(STATUS_CODES.CREATED).json(
                ResponseBuilder.success(MESSAGES.PASSWORD_RESET)
            );


        } catch (error) {
            next(error);
        }
    };

    


}