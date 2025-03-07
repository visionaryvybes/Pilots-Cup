import { NextResponse, type NextRequest } from 'next/server';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // requests per window

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
      "connect-src 'self' ws: wss:",
      "media-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
    ].join('; '),
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.ip ?? 'anonymous';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Clean up old entries
    for (const [key, data] of rateLimit.entries()) {
      if (data.timestamp < windowStart) {
        rateLimit.delete(key);
      }
    }

    // Check rate limit
    const currentLimit = rateLimit.get(ip);
    if (currentLimit) {
      if (currentLimit.timestamp < windowStart) {
        // Reset if window has passed
        rateLimit.set(ip, { count: 1, timestamp: now });
      } else if (currentLimit.count >= MAX_REQUESTS) {
        // Rate limit exceeded
        return new NextResponse(null, {
          status: 429,
          statusText: 'Too Many Requests',
          headers: {
            'Retry-After': '60',
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Increment counter
        currentLimit.count++;
      }
    } else {
      // First request in window
      rateLimit.set(ip, { count: 1, timestamp: now });
    }
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