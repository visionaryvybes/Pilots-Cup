import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const bookingFormSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  kartType: z.string().min(1, 'Please select a kart type'),
  numberOfKarts: z.number().min(1, 'Please select at least 1 kart').max(10, 'Maximum 10 karts per booking'),
  duration: z.number().min(15, 'Minimum duration is 15 minutes').max(120, 'Maximum duration is 120 minutes'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
});

export const newsletterFormSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const searchFormSchema = z.object({
  query: z.string().min(1, 'Please enter a search term'),
  category: z.string().optional(),
  sortBy: z.string().optional(),
});

export const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
  address: z.object({
    street: z.string().min(5, 'Street address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
  }).optional(),
  preferences: z.object({
    newsletter: z.boolean(),
    notifications: z.boolean(),
    language: z.string().min(2, 'Please select a language'),
  }).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type SearchFormData = z.infer<typeof searchFormSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>; 