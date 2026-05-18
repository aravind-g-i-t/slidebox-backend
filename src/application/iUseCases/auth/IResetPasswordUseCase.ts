export interface IResetPasswordUseCase{
    execute(input: {resetToken: string, newPassword: string}): Promise<void>
}