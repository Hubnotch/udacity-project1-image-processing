"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const index_1 = __importDefault(require("./routes/index"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many request from this API, try again in 15 minutes'
});
const app = (0, express_1.default)();
const PORT = 3005;
const whiteList = ['http://localhost:3005', 'http://localhost:3006'];
const corsConfig = {
    origin: (origin, callback) => {
        return whiteList.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by cors'));
    }
};
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(limiter);
app.use('/api', index_1.default);
app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
exports.default = app;
