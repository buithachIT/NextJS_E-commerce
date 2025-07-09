import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { cache } from "react";

export const getClient = cache(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_CLIENT_URI!,
      fetch,
    }),
  });
});
