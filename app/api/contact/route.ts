import { NextRequest } from 'next/server';
import { withErrorHandler } from '../../../lib/middleware/error-handler';
import { contactSchema, validateRequest } from '../../../lib/middleware/validate';
import { logger } from '../../../lib/utils/logger';

export const POST = withErrorHandler(async (request: NextRequest) => {
  const data = await validateRequest(contactSchema, request);
  
  // Log the contact form submission
  logger.info('Contact form submission received', { email: data.email });

  // Here you would typically:
  // 1. Send an email notification
  // 2. Store the contact request in a database
  // 3. Send a confirmation email to the user
  
  // For now, we'll just log it and return success
  return Response.json({
    message: 'Thank you for your message. We will get back to you soon.',
    data: {
      received: true,
      timestamp: new Date().toISOString(),
    },
  });
}); 