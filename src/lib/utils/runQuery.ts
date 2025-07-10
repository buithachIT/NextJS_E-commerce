import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloError,
  OperationVariables,
  DocumentNode,
} from '@apollo/client';

export async function safeQuery<T>(
  client: ApolloClient<NormalizedCacheObject>,
  query: DocumentNode,
  variables?: OperationVariables
): Promise<{ data?: T; error?: ApolloError }> {
  try {
    const result = await client.query<T>({ query, variables });
    return { data: result.data };
  } catch (error) {
    console.error('[GraphQL Error]', error);
    return { error: error as ApolloError };
  }
}
