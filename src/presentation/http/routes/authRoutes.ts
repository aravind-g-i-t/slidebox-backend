import express from "express"
import { ROUTES } from "../../../shared/constants/routes.js";
import type {Request,Response,NextFunction} from "express"
import { authController } from "../../../setup/container/authContainer.js";

const authRoutes= express.Router();


// user signup

authRoutes.post(ROUTES.SIGNUP,(req:Request,res:Response,next:NextFunction)=>authController.signup(req,res,next));

// otp-verification

authRoutes.post(ROUTES.VERIFY_OTP,(req:Request,res:Response,next:NextFunction)=>authController.verifyOTP(req,res,next));

// user login

authRoutes.post(ROUTES.SIGNIN,(req:Request,res:Response,next:NextFunction)=>authController.signin(req,res,next));

// user logout

authRoutes.post(ROUTES.LOGOUT,(req:Request,res:Response)=>authController.logout(req,res));


// token refresh

authRoutes.post(ROUTES.REFRESH,(req:Request,res:Response,next:NextFunction)=>authController.tokenRefresh(req,res,next))

export default authRoutes