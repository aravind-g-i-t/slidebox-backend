import express from 'express';
import { ROUTES } from '../../../shared/constants/routes.js';
import authRoutes from './authRoutes.js';
import imageRoutes from './imageRoutes.js';
const appRoutes = express.Router();

appRoutes.use(ROUTES.AUTH,authRoutes)
appRoutes.use(ROUTES.IMAGES,imageRoutes)



export default appRoutes;