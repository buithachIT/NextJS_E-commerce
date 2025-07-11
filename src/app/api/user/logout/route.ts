import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { STORAGE_KEY } from '@/config/storage';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(STORAGE_KEY.AUTH_TOKEN);
  cookieStore.delete(STORAGE_KEY.REFRESH_TOKEN);

  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
