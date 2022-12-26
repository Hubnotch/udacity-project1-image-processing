import express, { Request, Response } from 'express';
import { imageProcessing } from '../controllers/imageProcessingController';
const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  res.send('Home Route');
});

router.use('/image-processing', imageProcessing);

export default router;
