import { NextFunction, Request, Response } from 'express';

// Custom error interface
export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

// Factory function to create operational errors easily
export const createError = (message: string, statusCode = 500): AppError => {
  const err = new Error(message) as AppError;
  err.statusCode = statusCode;
  err.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  err.isOperational = true;
  return err;
};

export const routeNotFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    success: false,
  });
};

// Global error-handling middleware
export const globalErrorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('🔥 Global Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  // Optional: avoid leaking stack traces in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({
      status: err.status,
      message,
      success: false,
    });
  }

  // Detailed output for development
  return res.status(statusCode).json({
    status: err.status,
    message,
    success: false,
    // stack: err.stack,
  });
};
