import type { ICacheService } from "../../../domain/interfaces/ICacheService.js";
import type { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { hashPassword } from "../../../shared/utils/hash.js";

export class ResetPasswordUseCase {
    constructor(
        private _userRepository: IUserRepository,
        private _cacheService: ICacheService
    ){}

    async execute(input: {resetToken: string, newPassword: string}): Promise<void>{
        
        const { resetToken, newPassword } = input;
        const email = await this._cacheService.get<string>(`reset_token:${resetToken}`);
        
        if(!email){
            throw new AppError(MESSAGES.INVALID_RESET_TOKEN, STATUS_CODES.UNAUTHORIZED);
        }
        await this._cacheService.delete(`reset_token:${resetToken}`);
        const password= await hashPassword(newPassword);
        await this._userRepository.findOneAndUpdate({ email }, { password });
    }
}