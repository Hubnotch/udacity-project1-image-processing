import express from 'express';
import { imageProcessing } from '../controllers/imageProcessingController';

const imageProcessingRoute = express.Router();
imageProcessingRoute.get('/image-processing', imageProcessing);

export default imageProcessingRoute;