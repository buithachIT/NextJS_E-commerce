import { UPDATE_USER_MUTATION } from '@/graphql/queries/user';
import { NextResponse } from 'next/server';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, firstName, lastName } = body;

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        new HttpLink({
          uri:
            process.env.NEXT_PUBLIC_CLIENT_URI! ||
            'http://localhost:8000/graphql',
          credentials: 'include',
          fetch,
          headers: {
            cookie: req.headers.get('cookie') || '',
          },
        }),
      ]),
    });

    const { data } = await client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        input: {
          id,
          email,
          firstName,
          lastName,
        },
      },
    });

    return NextResponse.json(data.updateUser);
  } catch (error) {
    console.error('[UpdateUser] Error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
