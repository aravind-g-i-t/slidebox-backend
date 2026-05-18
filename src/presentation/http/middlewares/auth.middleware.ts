import type { Request, Response, NextFunction } from "express";
import type { ITokenService } from "../../../domain/interfaces/ITokenService.js";
import { STATUS_CODES } from "../../../shared/constants/httpStatus.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { tokenService } from "../../../setup/container/authContainer.js";


interface DecodedToken {
    id: string;
    role: Role;
    exp?: number;
    iat?: number;
}

type Role = "admin" | "learner" | "instructor";



const createAuthMiddleware = (tokenService: ITokenService) => {
    return async (req: Request, res: Response, next: NextFunction) => {


        const token = req.cookies?.accessToken;
        
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "No token provided" });
        }
        let decoded: DecodedToken
        
        try {
            decoded = await tokenService.verifyAccessToken(token);
        } catch {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.INVALID_TOKEN });
        }


        req.user = {
            id: decoded.id,
        }
        next();
    };
};

export const authMiddleware= createAuthMiddleware(tokenService)

