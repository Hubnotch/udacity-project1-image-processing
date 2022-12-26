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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Image Processing API', () => {
    it('should return a status code of 200 on successful image resizing request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
        // done()
    }));
    it('should return a status code of 200 on unsuccessful image resizing request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image-processing?filename=palmtunnel&width=350&height=500');
        expect(response.status).toBe(200);
    }));
    it('Expect 400 response code for missing one of query string parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=300');
        expect(response.status).toBe(404);
    }));
    it('Expect 400 response code for image not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=invalidName&width=400&height=400');
        expect(response.status).toBe(404);
    }));
});
