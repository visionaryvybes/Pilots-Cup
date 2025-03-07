import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AppError } from './error-handler';

export function validateRequest<T extends z.ZodType>(
  schema: T,
  request: NextRequest
): Promise<z.infer<T>> {
  return request
    .json()
    .then((body) => schema.parse(body))
    .catch((error) => {
      if (error instanceof z.ZodError) {
        throw error;
      }
      throw new AppError('Invalid request body', 400);
    });
}

// Common validation schemas
export const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  kartType: z.string(),
  numberOfKarts: z.number().int().positive(),
  duration: z.number().int().positive(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().regex(/^\+?[\d\s-]{8,}$/),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>; 