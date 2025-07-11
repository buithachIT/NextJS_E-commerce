/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from '@apollo/client';
import { getClient } from '../apollo/apollo-client';

/**
 * Generic mutation executor to reduce code duplication
 */
export async function runMutation<T>(
  mutation: any,
  variables: Record<string, any>,
  dataPath: string[],
  errorMessage = 'Mutation failed.'
): Promise<T> {
  try {
    const client = getClient();
    const { data } = await client.mutate({ mutation, variables });

    const result = dataPath.reduce((acc, key) => acc?.[key], data);

    if (!result) {
      throw new Error(errorMessage);
    }

    return result;
  } catch (err) {
    if (err instanceof ApolloError) {
      throw new Error(err.message);
    }
    throw err;
  }
}
