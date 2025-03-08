import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
    ].join('; '),
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // For API routes, add a basic rate limit header
  // Note: For production, use a proper rate limiting solution with Redis or similar
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Add headers to indicate rate limiting should be implemented
    response.headers.set('X-RateLimit-Limit', '100');
    
    // In production, implement proper rate limiting with Redis or a similar service
    // This is a placeholder for the actual implementation
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 