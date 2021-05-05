import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes/index';
import { cookieProps } from './shared/constants';

// Init express
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors());

// // Show routes called in console during development
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// // Security
// if (process.env.NODE_ENV === 'production') {
//     app.use(helmet());
// }

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


export default app;