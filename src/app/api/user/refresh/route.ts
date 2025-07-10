import { WPGRAPHQL_URL } from '@/config';
import { EXPIRED_TOKEN } from '@/config/auth';
import { STORAGE_KEY } from '@/config/storage';
import { REFRESH_TOKEN_MUTATION } from '@/graphql/mutations/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_: NextRequest) {
  const refreshToken = (await cookies()).get(STORAGE_KEY.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const response = await fetch(WPGRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: REFRESH_TOKEN_MUTATION,
      variables: {
        refreshToken,
      },
    }),
  });

  const result = await response.json();
  const token = result?.data?.refreshJwtAuthToken?.authToken;

  if (!token) {
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 }
    );
  }

  (await cookies()).set(STORAGE_KEY.AUTH_TOKEN, token, {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: EXPIRED_TOKEN.EXPIRED_ACCESS_TOKEN,
  });

  return NextResponse.json({ success: true });
}
