import type { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import type { ITokenService } from "../../../domain/interfaces/ITokenService";
import { comparePassword } from "../../../shared/utils/hash";
import type { SigninInputDTO, SigninOutputDTO } from "../../iUseCases/auth/ISigninUseCase";

export class SigninUseCase {
    constructor(
        private _userRepository: IUserRepository,
        private _tokenService: ITokenService
    ) { }

    async execute(data: SigninInputDTO):Promise<SigninOutputDTO> {
        const user = await this._userRepository.findByEmail(
            data.email
        );

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordMatch = await comparePassword(
            data.password,
            user.password
        );

        if (!isPasswordMatch) {
            throw new Error("Invalid credentials");
        }

        const accessToken =await this._tokenService.generateAccessToken({
                id: user.id
            });

        const refreshToken =await this._tokenService.generateRefreshToken({
                id: user.id
            });

        return {
            accessToken,
            refreshToken,
            user:{
                id:user.id,
                email:user.email,
                phone:user.phone,
                name:user.name,
                createdAt:user.createdAt
            }
        };
    }
}