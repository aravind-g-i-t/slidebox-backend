import express from 'express';
import { ROUTES } from '../../../shared/constants/routes';
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';
const appRoutes = express.Router();

appRoutes.use(ROUTES.AUTH,authRoutes)
appRoutes.use(ROUTES.IMAGES,imageRoutes)



export default appRoutes;