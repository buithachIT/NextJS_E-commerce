import { STORAGE_KEY } from '@/config/storage';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/lib/apollo/apollo-client';
import { EXPIRED_TOKEN } from '@/config/auth';
import { LOGIN_USER } from '@/graphql/mutations/auth';
import { loginFormSchema } from '@/features/auth/components/LoginForm/LoginFormSchema';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const parsed = loginFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const client = getClient();
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username: email, password },
    });

    const authToken = data?.login?.authToken;
    const refreshToken = data?.login?.refreshToken;

    if (!authToken || !refreshToken) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const cookieStore = cookies();

    (await cookieStore).set(STORAGE_KEY.AUTH_TOKEN, authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: EXPIRED_TOKEN.EXPIRED_ACCESS_TOKEN,
    });

    (await cookieStore).set(STORAGE_KEY.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: EXPIRED_TOKEN.EXPIRED_REFRESH_TOKEN,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Login error:', err);
    let message = 'Internal Server Error';
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof (err as { message?: unknown }).message === 'string'
    ) {
      message = (err as { message: string }).message;
    }
    return NextResponse.json({ message }, { status: 401 });
  }
}
