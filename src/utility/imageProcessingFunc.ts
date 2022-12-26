import sharp from "sharp";
import path from "path";
import {promises as fsPromises} from "fs";

const resizeImage = async (
    filename: string,
    width: number,
    height: number
):Promise<Buffer> => {
    try {
        return await sharp(
            path.resolve(__dirname, `../../images/${filename}.jpg`)
        )
            .resize({
                width: width,
                height: height,
                fit: sharp.fit.cover
            })
            .toBuffer();
    } catch (err) {
        return Promise.reject();
    }
}

export default resizeImage;