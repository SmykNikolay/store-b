import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import Database from '../database';
import { Product } from '../models/Product';
import { HttpError } from '../middlewares/errorHandler';

export class ProductController {
  static async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const productRepository = dataSource.getRepository(Product);
    try {
      const products = await productRepository.find();
      res.status(200).json(products);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          500,
        ),
      );
    }
  }

  static async getProductById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const productRepository = dataSource.getRepository(Product);
    try {
      const productId = parseInt(req.params.productId, 10);
      if (isNaN(productId)) {
        throw new HttpError('Неверный формат идентификатора продукта', 400);
      }

      const product = await productRepository.findOne({
        where: { id: productId },
      });

      if (product) {
        res.status(200).json(product);
      } else {
        throw new HttpError('Продукт не найден', 404);
      }
    } catch (error) {
      next(
        error instanceof HttpError
          ? error
          : new HttpError(
              error instanceof Error ? error.message : 'Неизвестная ошибка',
              500,
            ),
      );
    }
  }

  static async createProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const productRepository = dataSource.getRepository(Product);
    const productData = plainToClass(Product, req.body);

    const errors = await validate(productData);
    if (errors.length > 0) {
      const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
      return next(new HttpError(errorMessages.join(', '), 400));
    }

    const product = productRepository.create(productData);
    try {
      await productRepository.save(product);
      res.status(201).json(product);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          400,
        ),
      );
    }
  }
}
