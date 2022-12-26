import { promises as fsPromises } from 'fs';
import fs from 'fs';
import sharp from 'sharp';
import { Request, Response } from 'express';
import resizeImage from "../utility/imageProcessingFunc";
import path from 'path';


export const imageProcessing = async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.filename;
    const width = (Number(req.query.width) as unknown) as number;
    const height = (Number(req.query.height) as unknown) as number;

    const imagePath = `${process.cwd()}/images/${req.query.filename}.jpg`;
try {
    if (!filename || !width || !height) {
        res.status(404).send('Incorrect image parameters');
        return;
    }

    const resizedImagePath = `images/resized/${filename}x${width}x${height}.jpg`

    if (!fs.existsSync(resizedImagePath)) {
        const resizedImage = await resizeImage(imagePath, width, height);
        await fsPromises.writeFile(resizedImagePath, resizedImage)
    }
    res.sendFile(path.resolve(resizedImagePath))
} catch (error) {
    res.status(400).send('Image not found!');
}
   
};