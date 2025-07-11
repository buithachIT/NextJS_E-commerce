import { WPGRAPHQL_URL } from '@/config';
import { STORAGE_KEY } from '@/config/storage';
import { VIEWER_QUERY } from '@/graphql/queries/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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

  if (data.errors) {
    return NextResponse.json(
      { error: 'Token expired or invalid' },
      { status: 401 }
    );
  }

  return NextResponse.json(data.data.viewer);
}
