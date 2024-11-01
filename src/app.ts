import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import AuthMiddleware from './middlewares/authMiddleware';

import ProductRouter from './routes/products';

import DatabaseSingleton from './database';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://192.168.100.22:5173'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Недопустимый источник запроса!'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Origin', 'Accept'],
  exposedHeaders: ['Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(json());

app.use(AuthMiddleware.authenticate);

const database = DatabaseSingleton.getInstance();

database
  .initialize()
  .then(() => {
    console.log('База данных подключена');

    app.use('/products', ProductRouter);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send('Что-то пошло не так!');
    });

    app.use(errorHandler);

    app.listen(3000, () => {
      console.log('Сервер запущен на порту 3000');
    });
  })
  .catch((error) => console.log(error));
