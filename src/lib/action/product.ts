import { cache } from 'react';
import { apiPath } from '../api/utils';

async function fetchProductList(sortBy: string, limit: number) {
  try {
    const res = await fetch(
      apiPath(`/v1/product/search?sortBy=${sortBy}&orderBy=desc`)
    );
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    const json = await res.json();
    return { data: json.data.slice(0, limit) };
  } catch (err) {
    console.error(`fetchProductList (${sortBy}) error:`, err);
    return { data: [] };
  }
}

export const getBestSellerProducts = cache(() => fetchProductList('sold', 4));
export const getNewProducts = cache(() => fetchProductList('createdAt', 4));
export const getProductById = async (id: string) => {
  const res = await fetch(apiPath(`/v1/product/${id}`), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch product');

  const json = await res.json();
  return json.data;
};
// Get products by category
export const getProductsByCategory = cache(
  async (params: {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    orderBy?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params.categoryId) searchParams.set('categoryId', params.categoryId);
    if (params.minPrice !== undefined)
      searchParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined)
      searchParams.set('maxPrice', params.maxPrice.toString());
    if (params.size) searchParams.set('size', params.size);
    if (params.color) searchParams.set('color', params.color);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.orderBy) searchParams.set('orderBy', params.orderBy);

    const res = await fetch(apiPath(`/v1/product?${searchParams.toString()}`));
    const json = await res.json();
    return { data: json.data, meta: json.meta };
  }
);
