import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import ProductRouter from './routes/products';

import DatabaseSingleton from './database';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());

app.use(json());

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
