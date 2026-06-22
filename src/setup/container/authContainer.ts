import { ResendOTPUseCase } from "../../application/useCases/auth/ResendOTPUseCase";
import { ResetPasswordUseCase } from "../../application/useCases/auth/ResetPasswordUseCase";
import { SigninUseCase } from "../../application/useCases/auth/SigninUseCase";
import { SignupUseCase } from "../../application/useCases/auth/SignupUseCase";
import { TokenRefreshUseCase } from "../../application/useCases/auth/TokenRefreshUseCase";
import { VerifyEmailUseCase } from "../../application/useCases/auth/VerifyEmailUseCase";
import { VerifyOTPUseCase } from "../../application/useCases/auth/VerifyOTPUseCase";
import { VerifyResetOTPUseCase } from "../../application/useCases/auth/VerifyResetOTPUseCase";
import { MongoTransactionManager } from "../../infrastructure/database/mongo/MongoTransactionManager";
import { UserRepository } from "../../infrastructure/database/mongo/repositories/UserRepository";
import { JWTService } from "../../infrastructure/services/JWTService";
import { NodemailerService } from "../../infrastructure/services/NodemailerService";
import { RedisCacheService } from "../../infrastructure/services/RedisCacheService";
import { WinstonLogger } from "../../infrastructure/services/WinstonLogger";
import { AuthController } from "../../presentation/http/controller/AuthController";


export const tokenService= new JWTService()

const userRepository= new UserRepository();
const emailService = new NodemailerService();
const cacheService = new RedisCacheService()
export const logger = new WinstonLogger()
export const transactionManager= new MongoTransactionManager()

const signupUseCase= new SignupUseCase(userRepository,cacheService,emailService);
const signinUseCase = new SigninUseCase(userRepository,tokenService);
const verifyOTPUseCase= new VerifyOTPUseCase(cacheService,userRepository)

const tokenRefreshUseCase= new TokenRefreshUseCase(tokenService,userRepository)

const verifyEmailUseCase= new VerifyEmailUseCase(userRepository,emailService,cacheService)

const verifyResetOTPUseCase= new VerifyResetOTPUseCase(cacheService)
const resetPasswordUseCase= new ResetPasswordUseCase(userRepository,cacheService)

const resendOTPUseCase = new ResendOTPUseCase(emailService,cacheService)


export const authController= new AuthController(logger,signupUseCase,verifyOTPUseCase,signinUseCase,tokenRefreshUseCase,verifyEmailUseCase,verifyResetOTPUseCase,resetPasswordUseCase,resendOTPUseCase)