import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message });
}
