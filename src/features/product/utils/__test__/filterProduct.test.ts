import { describe, it, expect } from 'vitest';
import { filterProducts } from '../filterProduct';
import { ProductCategoryListType } from '@/types/product';
import { FilterValues } from '@/features/product/components/FilterProduct/FilterProduct';
import { StockStatusEnum } from '@/__generated__/types';

const mockProducts: ProductCategoryListType[] = [
  // Variable Product 1: Red, L, Price 150
  {
    __typename: 'VariableProduct',
    id: 'vp1',
    price: '150',
    stockStatus: StockStatusEnum.InStock,
    attributes: {
      __typename: 'ProductWithAttributesToProductAttributeConnection',
      nodes: [
        {
          __typename: 'LocalProductAttribute',
          name: 'pa_color',
          options: ['Red'],
        },
        {
          __typename: 'LocalProductAttribute',
          name: 'pa_size',
          options: ['L'],
        },
      ],
    },
  },
  // Variable Product 2: Blue, M, Price 250
  {
    __typename: 'VariableProduct',
    id: 'vp2',
    price: '250',
    stockStatus: StockStatusEnum.InStock,
    attributes: {
      __typename: 'ProductWithAttributesToProductAttributeConnection',
      nodes: [
        {
          __typename: 'LocalProductAttribute',
          name: 'pa_color',
          options: ['Blue'],
        },
        {
          __typename: 'LocalProductAttribute',
          name: 'pa_size',
          options: ['M'],
        },
      ],
    },
  },
  // Simple Product: Price 100
  {
    __typename: 'SimpleProduct',
    id: 'sp1',
    price: '100',
    stockStatus: StockStatusEnum.InStock,
  },
  // Other product type, should be filtered out
  {
    __typename: 'ExternalProduct',
    id: 'ep1',
  },
];

describe('filterProducts utility', () => {
  it('should return all simple/variable products when no filters are applied', () => {
    const filters: FilterValues = {
      price: [0, 1000],
      color: [],
      size: [],
    };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(3);
    expect(result.map((p) => p.id)).toEqual(['vp1', 'vp2', 'sp1']);
  });

  it('should filter by price range', () => {
    const filters: FilterValues = {
      price: [120, 200],
      color: [],
      size: [],
    };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('vp1');
  });

  it('should filter by color', () => {
    const filters: FilterValues = {
      price: [0, 1000],
      color: ['Blue'],
      size: [],
    };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('vp2');
  });

  it('should filter by size', () => {
    const filters: FilterValues = {
      price: [0, 1000],
      color: [],
      size: ['L'],
    };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('vp1');
  });

  it('should exclude SimpleProducts when a size filter is active', () => {
    const filters: FilterValues = {
      price: [0, 1000],
      color: [],
      size: ['M'], // This should filter out the simple product
    };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('vp2'); // Only vp2 should match
  });

  it('should filter by color and size combined', () => {
    const filters: FilterValues = {
      price: [0, 1000],
      color: ['Red'],
      size: ['L'],
    };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('vp1');
  });

  it('should return an empty array if no products match all filters', () => {
    const filters: FilterValues = {
      price: [0, 100], // only sp1
      color: ['Red'], // only vp1
      size: ['M'], // only vp2
    };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(0);
  });

  it('should handle an empty product list', () => {
    const filters: FilterValues = {
      price: [0, 1000],
      color: ['Red'],
      size: [],
    };
    const result = filterProducts([], filters);
    expect(result).toHaveLength(0);
  });
}); 