import express, {Router} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from './utils/errors';
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per 15 min
}));

const router = Router();

router.use('/ad', adRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => console.log('Server is running on port 3001...'));
