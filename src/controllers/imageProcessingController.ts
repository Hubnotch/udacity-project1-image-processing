import * as fs from "fs";
import sharp from 'sharp'
import { Request, Response } from 'express'

export const imageProcessing = async (req: Request, res: Response) => {
    const filename = req.query.filename;
    const width = (Number(req.query.width) as unknown) as number;
    const height = (Number(req.query.height) as unknown) as number;

    
    const imagePath = `${process.cwd()}/images/${req.query.filename}.jpg`;
    if (!filename || !width || !height) {
        res.status(404).send('Incorrect image parameters');
        return;
     }
     
    await sharp(imagePath)
        .resize(width, height)
        .toBuffer()
        .then((data: Buffer) => {
            res.set('Content-Type', 'image/jpg')
            res.set('Cache-Control', 'public, max-age=31536000')
            res.send(data)
        }).catch((err: Error) => {
            res.status(500).json({ error: err.message })
        })
}
