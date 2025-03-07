import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    logger.warn(error.message, { code: error.code, statusCode: error.statusCode });
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    logger.warn('Validation error', { issues: error.issues });
    return NextResponse.json(
      {
        error: 'Validation error',
        details: error.issues,
      },
      { status: 400 }
    );
  }

  // Handle unknown errors
  logger.error('Unhandled error', error);
  return NextResponse.json(
    {
      error: 'Internal server error',
    },
    { status: 500 }
  );
}

export function withErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleError(error);
    }
  };
} 