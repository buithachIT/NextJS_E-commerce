import { WPGRAPHQL_URL } from '@/config';
import { STORAGE_KEY } from '@/config/storage';
import { VIEWER_QUERY } from '@/graphql/queries/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const authToken = req.cookies.get(STORAGE_KEY.AUTH_TOKEN)?.value;

    if (!authToken) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }

    const response = await fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        query: VIEWER_QUERY,
      }),
    });

    const data = await response.json();

    const debugMessage = data?.errors?.[0]?.extensions?.debugMessage;
    const isExpired = debugMessage === 'Expired token';

    if (isExpired) {
      return NextResponse.json(
        { error: 'Token expired or invalid' },
        { status: 401 }
      );
    }

    if (data.errors) {
      console.warn('GraphQL error:', debugMessage || data.errors);
      return NextResponse.json({ error: 'GraphQL error' }, { status: 500 });
    }

    const viewer = data?.data?.viewer;

    if (!viewer || typeof viewer !== 'object') {
      console.warn('Viewer is invalid:', viewer);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: viewer.id,
      username: viewer.username,
      email: viewer.email,
      lastName: viewer.lastName,
      firstName: viewer.firstName,
    });
  } catch (err) {
    console.error('Unexpected error in /api/user/fetchUser:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
