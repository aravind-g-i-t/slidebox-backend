import { ResendOTPUseCase } from "../../application/useCases/auth/ResendOTPUseCase.js";
import { ResetPasswordUseCase } from "../../application/useCases/auth/ResetPasswordUseCase.js";
import { SigninUseCase } from "../../application/useCases/auth/SigninUseCase.js";
import { SignupUseCase } from "../../application/useCases/auth/SignupUseCase.js";
import { TokenRefreshUseCase } from "../../application/useCases/auth/TokenRefreshUseCase.js";
import { VerifyEmailUseCase } from "../../application/useCases/auth/VerifyEmailUseCase.js";
import { VerifyOTPUseCase } from "../../application/useCases/auth/VerifyOTPUseCase.js";
import { VerifyResetOTPUseCase } from "../../application/useCases/auth/VerifyResetOTPUseCase.js";
import { UserRepository } from "../../infrastructure/database/mongo/repositories/UserRepository.js";
import { JWTService } from "../../infrastructure/services/JWTService.js";
import { NodemailerService } from "../../infrastructure/services/NodemailerService.js";
import { RedisCacheService } from "../../infrastructure/services/RedisCacheService.js";
import { WinstonLogger } from "../../infrastructure/services/WinstonLogger.js";
import { AuthController } from "../../presentation/http/controller/AuthController.js";


export const tokenService= new JWTService()

const userRepository= new UserRepository();
const emailService = new NodemailerService();
const cacheService = new RedisCacheService()
export const logger = new WinstonLogger()

const signupUseCase= new SignupUseCase(userRepository,cacheService,emailService);
const signinUseCase = new SigninUseCase(userRepository,tokenService);
const verifyOTPUseCase= new VerifyOTPUseCase(cacheService,userRepository)

const tokenRefreshUseCase= new TokenRefreshUseCase(tokenService,userRepository)

const verifyEmailUseCase= new VerifyEmailUseCase(userRepository,emailService,cacheService)

const verifyResetOTPUseCase= new VerifyResetOTPUseCase(cacheService)
const resetPasswordUseCase= new ResetPasswordUseCase(userRepository,cacheService)

const resendOTPUseCase = new ResendOTPUseCase(emailService,cacheService)


export const authController= new AuthController(logger,signupUseCase,verifyOTPUseCase,signinUseCase,tokenRefreshUseCase,verifyEmailUseCase,verifyResetOTPUseCase,resetPasswordUseCase,resendOTPUseCase)