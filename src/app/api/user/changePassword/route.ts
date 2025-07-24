import { WPGRAPHQL_URL } from '@/config';
import { STORAGE_KEY } from '@/config/storage';
import { changePasswordFormSchema } from '@/features/user/components/ChangePassword/ChangePasswordTabFormSchema';
import { UPDATE_USER_PASSWORD } from '@/graphql/mutations/user';
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
    const loginRes = await fetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userName, password: currentPassword }),
    });

    if (!loginRes.ok) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    const token = req.cookies.get(STORAGE_KEY.AUTH_TOKEN)?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication token missing' },
        { status: 401 }
      );
    }

    const graphqlQuery = {
      query: UPDATE_USER_PASSWORD,
      variables: {
        id: userId,
        password: newPassword,
      },
    };

    const graphqlRes = await fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(graphqlQuery),
    });

    const json = await graphqlRes.json();

    if (json.errors) {
      const message = json.errors[0]?.message || 'GraphQL error';
      return NextResponse.json({ error: message }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      user: json.data.updateUser.user,
    });
  } catch (error) {
    console.error('Failed to update password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
