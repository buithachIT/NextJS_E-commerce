import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runMutation } from '../runMutation';
import { getClient } from '../../apollo/apollo-client';
import { ApolloError } from '@apollo/client';

// Mock the getClient dependency
vi.mock('../../apollo/apollo-client', () => ({
  getClient: vi.fn(),
}));

const mockedGetClient = vi.mocked(getClient);

const mockMutate = vi.fn();
const mockClient = {
  mutate: mockMutate,
};

describe('runMutation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // @ts-expect-error - Mocking a simplified client
    mockedGetClient.mockReturnValue(mockClient);
  });

  it('should return the nested data on a successful mutation', async () => {
    const mockData = {
      data: {
        createUser: {
          user: { id: '1', name: 'John Doe' },
        },
      },
    };
    mockMutate.mockResolvedValue(mockData);

    const result = await runMutation(
      'CREATE_USER',
      { name: 'John Doe' },
      ['createUser', 'user']
    );

    expect(result).toEqual({ id: '1', name: 'John Doe' });
    expect(mockMutate).toHaveBeenCalledWith({
      mutation: 'CREATE_USER',
      variables: { name: 'John Doe' },
    });
  });

  it('should throw an error if the data path is invalid', async () => {
    const mockData = {
      data: {
        createUser: {
          // Missing 'user' object
        },
      },
    };
    mockMutate.mockResolvedValue(mockData);
    const customError = 'User creation failed.';

    await expect(
      runMutation(
        'CREATE_USER',
        { name: 'John Doe' },
        ['createUser', 'user'],
        customError
      )
    ).rejects.toThrow(customError);
  });

  it('should throw a custom error message from ApolloError', async () => {
    const apolloError = new ApolloError({
      errorMessage: 'GraphQL error: Invalid credentials',
    });
    mockMutate.mockRejectedValue(apolloError);

    await expect(
      runMutation('LOGIN_USER', {}, ['login', 'token'])
    ).rejects.toThrow('GraphQL error: Invalid credentials');
  });

  it('should re-throw a generic error if it is not an ApolloError', async () => {
    const genericError = new Error('Network request failed');
    mockMutate.mockRejectedValue(genericError);

    await expect(runMutation('ANY_MUTATION', {}, [])).rejects.toThrow(
      'Network request failed'
    );
  });
}); 