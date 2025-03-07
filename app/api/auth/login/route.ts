import { SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In a real app, this would be stored in a database
const users = [
  {
    id: '1',
    email: 'admin@pilotscup.com',
    // In a real app, this would be hashed
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@pilotscup.com',
    password: 'user123',
    role: 'user'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    // In a real app, we would:
    // 1. Hash passwords
    // 2. Use secure session management
    // 3. Implement rate limiting
    // 4. Add 2FA support
    // 5. Log authentication attempts

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Enable CORS
export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 