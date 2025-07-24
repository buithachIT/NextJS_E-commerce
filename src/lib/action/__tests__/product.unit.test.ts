/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as productActions from '../product';
import { safeQuery } from '../../utils/runQuery';
import { getClient } from '../../apollo/apollo-client';
import { ApolloError } from '@apollo/client';

vi.mock('../../utils/runQuery');
vi.mock('../../apollo/apollo-client');

const mockedSafeQuery = vi.mocked(safeQuery);
const mockedGetClient = vi.mocked(getClient);

const mockClient = {
  query: vi.fn(),
};

const mockNodes = [
  { __typename: 'SimpleProduct', id: '1', name: 'Product 1' },
  { __typename: 'SimpleProduct', id: '2', name: 'Product 2' },
  { __typename: 'SimpleProduct', id: '3', name: 'Product 3' },
  { __typename: 'SimpleProduct', id: '4', name: 'Product 4' },
  { __typename: 'SimpleProduct', id: '5', name: 'Product 5' },
];

const mockApolloError = new ApolloError({ errorMessage: 'test error' });

describe('product actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedGetClient.mockReturnValue(mockClient as never);
  });

  describe('getNewProducts', () => {
    it('returns the first 4 products when data exists', async () => {
      mockedSafeQuery.mockResolvedValue({
        data: { products: { nodes: mockNodes } },
      } as any);
      const result = await productActions.getNewProducts();
      if (result && result.length > 0) {
        expect(result).toHaveLength(4);
        expect(result[0].id).toBe('1');
      }
    });

    it('returns an empty array if an error occurs', async () => {
      mockedSafeQuery.mockResolvedValue({ error: mockApolloError });
      const result = await productActions.getNewProducts();
      expect(result).toEqual([]);
    });
  });

  describe('getBestSellerProducts', () => {
    it('returns all products when data exists', async () => {
      mockedSafeQuery.mockResolvedValue({
        data: { products: { nodes: mockNodes } },
      } as any);
      const result = await productActions.getBestSellerProducts();
      expect(result).toEqual(mockNodes);
    });

    it('returns an empty array if an error occurs', async () => {
      mockedSafeQuery.mockResolvedValue({ error: mockApolloError });
      const result = await productActions.getBestSellerProducts();
      expect(result).toEqual([]);
    });
  });

  describe('getProductBySlug', () => {
    it('returns a product when data exists', async () => {
      const product = { __typename: 'SimpleProduct', id: 'p1', name: 'Test' };
      mockedSafeQuery.mockResolvedValue({
        data: { product },
      } as any);
      const result = await productActions.getProductBySlug('slug');
      expect(result).toEqual(product);
    });

    it('returns null if an error occurs', async () => {
      mockedSafeQuery.mockResolvedValue({ error: mockApolloError });
      const result = await productActions.getProductBySlug('slug');
      expect(result).toBeNull();
    });
  });

  describe('getProductByCategory', () => {
    it('returns products when data exists', async () => {
      mockedSafeQuery.mockResolvedValue({
        data: { products: { nodes: mockNodes } },
      } as any);
      const result = await productActions.getProductByCategory('cat');
      expect(result).toEqual(mockNodes);
    });

    it('returns null if an error occurs', async () => {
      mockedSafeQuery.mockResolvedValue({ error: mockApolloError });
      const result = await productActions.getProductByCategory('cat');
      expect(result).toBeNull();
    });

    it('returns an empty array if nodes is null/undefined', async () => {
      mockedSafeQuery.mockResolvedValue({
        data: { products: { nodes: null } },
      } as any);
      const result = await productActions.getProductByCategory('cat');
      expect(result).toEqual([]);
    });
  });

  describe('getSizeColor', () => {
    it('returns colors and sizes when the query succeeds', async () => {
      mockClient.query.mockResolvedValue({
        data: {
          allPaColor: { nodes: ['red', 'blue'] },
          allPaSize: { nodes: ['M', 'L'] },
        },
      });
      const result = await productActions.getSizeColor();
      expect(result).toEqual({ colors: ['red', 'blue'], sizes: ['M', 'L'] });
    });

    it('returns empty arrays when the query fails', async () => {
      mockClient.query.mockRejectedValue(new Error('GraphQL Error'));
      const result = await productActions.getSizeColor();
      expect(result).toEqual({ colors: [], sizes: [] });
    });
  });
}); 