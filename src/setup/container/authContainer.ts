import { SigninUseCase } from "../../application/useCases/auth/SigninUseCase.js";
import { SignupUseCase } from "../../application/useCases/auth/SignupUseCase.js";
import { TokenRefreshUseCase } from "../../application/useCases/auth/TokenRefreshUseCase.js";
import { VerifyOTPUseCase } from "../../application/useCases/auth/VerifyOTPUseCase.js";
import { UserRepository } from "../../infrastructure/database/mongo/repositories/UserRepository.js";
import { JWTService } from "../../infrastructure/services/JWTService.js";
import { NodemailerService } from "../../infrastructure/services/NodemailerService.js";
import { RedisCacheService } from "../../infrastructure/services/RedisCacheService.js";
import { AuthController } from "../../presentation/http/controller/AuthController.js";


export const tokenService= new JWTService()

const userRepository= new UserRepository();
const emailService = new NodemailerService();
const cacheService = new RedisCacheService()

const signupUseCase= new SignupUseCase(userRepository,cacheService,emailService);
const signinUseCase = new SigninUseCase(userRepository,tokenService);
const verifyOTPUseCase= new VerifyOTPUseCase(cacheService,userRepository)

const tokenRefreshUseCase= new TokenRefreshUseCase(tokenService,userRepository)


export const authController= new AuthController(signupUseCase,verifyOTPUseCase,signinUseCase,tokenRefreshUseCase)