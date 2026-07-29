import type { ICacheService } from "../../interfaces/services/ICacheService";
import type { IUserRepository } from "../../interfaces/services/IUserRepository";
import { STATUS_CODES } from "../../../shared/constants/httpStatus";
import { MESSAGES } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/errors/AppError";
import { hashPassword } from "../../../shared/utils/hash";

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