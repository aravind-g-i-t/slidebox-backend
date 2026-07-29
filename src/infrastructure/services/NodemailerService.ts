import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import { AppError } from '../../shared/errors/AppError';
import type { IEmailService } from '../../application/interfaces/services/IEmailService';
import { env } from '../../config/env';
dotenv.config();

const slideboxEmail = env.SLIDEBOX_EMAIL;
const slideboxPassword = env.SLIDEBOX_EMAIL_PASS;

export class NodemailerService implements IEmailService {
    constructor(
        private transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: slideboxEmail,
                pass: slideboxPassword,
            },
        })
    ) { }

    async send(email: string, subject: string, text: string): Promise<void> {
        try {
            const mailOptions = {
                from: slideboxEmail,
                to: email,
                subject,
                text
            }
            await this.transporter.sendMail(mailOptions);
        } catch(err) {
            console.log(err)
            throw new AppError("Failed to send OTP")
        }
    }
}