import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    CLIENT_URL: z.string().url(),

    PORT: z.coerce.number().positive(),

    MONGODB_URI: z.string().min(1),

    JWT_ACCESS_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),

    REFRESH_TOKEN_MAX_AGE: z.string().min(1),
    ACCESS_TOKEN_MAX_AGE: z.string().min(1),

    ACCESS_TOKEN_COOKIE_MAX_AGE: z.coerce.number().positive(),
    REFRESH_TOKEN_COOKIE_MAX_AGE: z.coerce.number().positive(),

    REDIS_URL: z.string().min(1),
    REDIS_PORT: z.coerce.number().positive(),

    OTP_TTL_SECONDS: z.coerce.number().positive(),
    SIGNUPDATA_TTL_SECONDS: z.coerce.number().positive(),

    SLIDEBOX_EMAIL: z.string().email(),
    SLIDEBOX_EMAIL_PASS: z.string().min(1),

    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables");
    console.error(parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;