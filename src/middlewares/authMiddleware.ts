import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Явно указываем путь к .env файлу
dotenv.config({ path: path.resolve(__dirname, '../.env') });

class AuthMiddleware {
  private static _instance: AuthMiddleware;
  private readonly _validTokens: string;

  private constructor() {
    const tokens = process.env.VALID_TOKENS;
    if (!tokens) {
      throw new Error('VALID_TOKENS не определен в .env файле');
    }
    // Удаляем лишние пробелы из токенов
    this._validTokens = tokens
      .split(',')
      .map((token) => token.trim())
      .join(',');
    console.log('Valid tokens initialized:', this._validTokens);
  }

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware._instance) {
      AuthMiddleware._instance = new AuthMiddleware();
    }
    return AuthMiddleware._instance;
  }

  public authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const authHeader = req.headers['authorization'];
    console.log('Auth header:', authHeader);

    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    console.log('Extracted token:', token);
    console.log('Valid tokens:', this._validTokens);

    if (token && this._validTokens.split(',').includes(token.trim())) {
      next();
    } else {
      res.status(401).json({ message: 'Неверный или отсутствующий токен' });
    }
  };
}

export default AuthMiddleware.getInstance();
