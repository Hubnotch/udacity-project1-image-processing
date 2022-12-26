"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProcessing = void 0;
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const imageProcessingFunc_1 = __importDefault(require("../utility/imageProcessingFunc"));
const path_1 = __importDefault(require("path"));
const imageProcessing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('got here');
        const filename = req.query.filename;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        const imagePath = `${process.cwd()}/images/${req.query.filename}.jpg`;
        if (!filename || !width || !height) {
            res.status(404).send('Incorrect image parameters');
            return;
        }
        const resizedImagePath = `images/resized/${filename}x${width}x${height}.jpg`;
        if (!fs_2.default.existsSync(resizedImagePath)) {
            const resizedImage = yield (0, imageProcessingFunc_1.default)(filename, width, height);
            yield fs_1.promises.writeFile(resizedImagePath, resizedImage);
        }
        res.sendFile(path_1.default.resolve(resizedImagePath));
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Image not found!');
    }
});
exports.imageProcessing = imageProcessing;
