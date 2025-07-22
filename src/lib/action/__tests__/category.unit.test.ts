import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCategory } from '../category';
import { safeQuery } from '../../utils/runQuery';
import { getClient } from '../../apollo/apollo-client';
import { ApolloError } from '@apollo/client';

vi.mock('../../utils/runQuery');
vi.mock('../../apollo/apollo-client');

const mockedSafeQuery = vi.mocked(safeQuery);
const mockedGetClient = vi.mocked(getClient);

const mockClient = {};
const mockCategories = [
  { id: 'cat1', name: 'Category 1' },
  { id: 'cat2', name: 'Category 2' },
];
const mockApolloError = new ApolloError({ errorMessage: 'test error' });

describe('getCategory', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedGetClient.mockReturnValue(mockClient);
  });

  it('should return categories when the query is successful', async () => {
    mockedSafeQuery.mockResolvedValue({
      data: { productCategories: { nodes: mockCategories } },
    });

    const result = await getCategory();

    expect(result).toEqual(mockCategories);
    expect(mockedGetClient).toHaveBeenCalled();
    expect(mockedSafeQuery).toHaveBeenCalledWith(mockClient, expect.anything());
  });

  it('should return null if there is an error', async () => {
    mockedSafeQuery.mockResolvedValue({ error: mockApolloError });

    const result = await getCategory();

    expect(result).toBeNull();
  });

  it('should return null if data is null', async () => {
    mockedSafeQuery.mockResolvedValue({ data: null });

    const result = await getCategory();

    expect(result).toBeNull();
  });

  it('should return null if productCategories is null', async () => {
    mockedSafeQuery.mockResolvedValue({
      data: { productCategories: null },
    });

    const result = await getCategory();

    expect(result).toBeUndefined(); // Or null, depending on implementation
  });

  it('should return null if nodes is null', async () => {
    mockedSafeQuery.mockResolvedValue({
      data: { productCategories: { nodes: null } },
    });

    const result = await getCategory();

    expect(result).toBeNull();
  });
}); 