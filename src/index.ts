import express from 'express';
import morgan from 'morgan';
import cors,{CorsOptions} from 'cors';
import rateLimiter from 'express-rate-limit';
import imageProcessingRoute from './routes';

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many request from this API, try again in 15 minutes'
});

const app = express();
const PORT = 3005;
const whiteList = ['http://localhost:3005', 'http://localhost:3006']
const corsConfig = {
    origin: (origin: CorsOptions, callback: Function) => {
        return whiteList.indexOf(origin as string) !== -1 ? callback(null, true) : callback(new Error('Not allowed by cors'))
    }
};
app.use(morgan('dev'));
app.use(cors());
app.use(limiter);

app.use('/api', imageProcessingRoute);

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
export default app;