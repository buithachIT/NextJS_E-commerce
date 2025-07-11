export const enableMocking = process.env.NEXT_PUBLIC_ENABLE_MOCK === '1';
export const WPGRAPHQL_URL =
  process.env.NEXT_PUBLIC_CLIENT_URI ||
  'http://localhost:8000/index.php?graphql';
