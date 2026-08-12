import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = 'partegy2026';
const COOKIE_NAME = 'partegy_auth';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password === PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('partegy_auth');
  return response;
}
