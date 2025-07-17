import {
  ApolloClient,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { cache } from 'react';

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) return;

  const isExpired = graphQLErrors.some(
    (err) => err.message === 'JWT Token expired'
  );

  if (!isExpired) return;

  return fromPromise(
    fetch('/api/user/refresh', {
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      if (!res.ok) throw new Error('Refresh failed');
      const data = await res.json();
      if (!data?.success) throw new Error('No token refreshed');
    })
  ).flatMap(() => forward(operation));
});

export const getClient = cache(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      new HttpLink({
        uri:
          process.env.NEXT_PUBLIC_CLIENT_URI! ||
          'http://localhost:8000/graphql',
        credentials: 'include',
      }),
    ]),
  });
});
