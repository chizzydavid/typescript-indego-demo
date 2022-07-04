import { Response, NextFunction, Request } from 'express';
import httpStatus from 'http-status';
import CONFIG from '../config/app.config';
import logger from '../utils/logger';

/**
 * Error handler Send stacktrace only during development
 */
export const errorHandler = (err: any, req: Request, res: Response) => {
  const statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
	const response = {
    success: false,
    error: {
      statusCode,
      message: err.message || httpStatus[err.status],
      errors: err.errors,
      timestamp: new Date().toISOString(),
      IP: req.ip,
      URL: req.originalUrl,
    }
	};

  const isProduction = CONFIG.ENV === 'production';
  const isDevelopment = CONFIG.ENV === 'development';

  if (!isProduction) {
    logger.error(err.message);
  }
  return res.status(statusCode).json(response);
};


/**
 * Catch 404 and forward to error handler
 */
export const notFoundHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return errorHandler(err, req, res)
};


export class CustomError {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo
  }
}


export class NotFoundError extends CustomError {
  status!: number;
  message!: string;
  additionalInfo!: any;

  constructor(
    message = 'Item not found', 
    status = httpStatus.NOT_FOUND, 
    additionalInfo: any = {}
  ) {
    super(message, status, additionalInfo);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo
  }  
}