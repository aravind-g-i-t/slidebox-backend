import express from "express"
import { ROUTES } from "../../../shared/constants/routes";
import type {Request,Response,NextFunction} from "express"
import { imageController } from "../../../setup/container/imageContainer";
import { upload } from "../../../infrastructure/services/multerConfig";
import { authMiddleware } from "../middlewares/auth.middleware";

const imageRoutes= express.Router();




// image upload route

imageRoutes.post(ROUTES.UPLOAD,authMiddleware,upload.array("images"),(req:Request,res:Response,next:NextFunction)=>imageController.uploadImage(req,res,next));

// get images

imageRoutes.get("/",authMiddleware,(req:Request,res:Response,next:NextFunction)=>imageController.getImages(req,res,next));

// rearrange images

imageRoutes.patch(ROUTES.REARRANGE,authMiddleware,(req:Request,res:Response,next:NextFunction)=>imageController.reArrangeImages(req,res,next));

// update title

imageRoutes.patch(ROUTES.TITLE,authMiddleware,(req:Request,res:Response,next:NextFunction)=>imageController.updateTitle(req,res,next));

// update image file

imageRoutes.patch(ROUTES.FILE,authMiddleware,upload.single("image"),(req:Request,res:Response,next:NextFunction)=>imageController.updateImageFile(req,res,next));

// delete image

imageRoutes.delete(ROUTES.IMAGE,authMiddleware,(req:Request,res:Response,next:NextFunction)=>imageController.deleteImage(req,res,next));

export default imageRoutes;