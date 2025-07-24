/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { safeQuery } from '../runQuery';
import { ApolloClient, ApolloError, InMemoryCache } from '@apollo/client';
import { DocumentNode } from 'graphql';

// Mock console.error to prevent logging during tests
const consoleErrorSpy = vi
  .spyOn(console, 'error')
  .mockImplementation(() => { });

describe('safeQuery', () => {
  let mockClient: ApolloClient<any>;
  let mockQuery: DocumentNode;

  beforeEach(() => {
    mockClient = new ApolloClient({ cache: new InMemoryCache() });
    mockQuery = {} as DocumentNode; // Simple mock for DocumentNode
    vi.clearAllMocks();
  });

  it('should return data on a successful query', async () => {
    const mockData = { users: [{ id: '1', name: 'John Doe' }] };
    mockClient.query = vi.fn().mockResolvedValue({ data: mockData });

    const result = await safeQuery(mockClient, mockQuery);

    expect(result.data).toEqual(mockData);
    expect(result.error).toBeUndefined();
    expect(mockClient.query).toHaveBeenCalledWith({
      query: mockQuery,
      variables: undefined,
    });
  });

  it('should return an error when the query fails', async () => {
    const apolloError = new ApolloError({
      errorMessage: 'GraphQL error: Not found',
    });
    mockClient.query = vi.fn().mockRejectedValue(apolloError);

    const result = await safeQuery(mockClient, mockQuery);

    expect(result.data).toBeUndefined();
    expect(result.error).toBe(apolloError);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[GraphQL Error]', apolloError);
  });

  it('should pass variables to the client query method', async () => {
    const mockData = { products: [] };
    const variables = { category: 'electronics' };
    mockClient.query = vi.fn().mockResolvedValue({ data: mockData });

    await safeQuery(mockClient, mockQuery, variables);

    expect(mockClient.query).toHaveBeenCalledWith({
      query: mockQuery,
      variables,
    });
  });
}); 