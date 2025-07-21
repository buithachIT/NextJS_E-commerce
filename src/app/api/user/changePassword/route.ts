import { STORAGE_KEY } from '@/config/storage';
import { changePasswordFormSchema } from '@/features/user/components/ChangePassword/ChangePasswordTabFormSchema';
import { UPDATE_USER_PASSWORD } from '@/graphql/mutations/user';
import { getClient } from '@/lib/apollo/apollo-client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = changePasswordFormSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message).join(', ');
      return NextResponse.json({ error: errors }, { status: 400 });
    }
    const { userId, userName } = body;
    const { currentPassword, newPassword } = parsed.data;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userName, password: currentPassword }),
    });
    console.log(userId, userName, currentPassword);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Current password wrong!' },
        { status: 401 }
      );
    }
    const token = req.cookies.get(STORAGE_KEY.AUTH_TOKEN)?.value;
    console.log(token)
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication token missing' },
        { status: 401 }
      );
    }
    const client = getClient();
    let data;
    try {
      data = await client.mutate({
        mutation: UPDATE_USER_PASSWORD,
        variables: { id: userId, password: newPassword },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (apolloError) {
      console.error('GraphQL error:', apolloError);
      return NextResponse.json(
        { error: 'Can not change your password, please try again!' },
        { status: 403 }
      );
    }

    if (!data?.data?.updateUser?.user) {
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.data.updateUser.user,
    });
  } catch (error) {
    console.error('Failed to update password:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 }
    );
  }
}
