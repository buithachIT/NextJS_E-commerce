import { cache } from 'react';
import { apiPath } from '../api/utils';
import { getClient } from '../apollo/apollo-client';
import { GET_PRODUCT_BY_SLUG, GET_PRODUCTS_BY_TAG } from '@/utils/gql/GQL_QUERIES';

export async function getBestSellerProducts() {
  console.log('hceck path', process.env.NEXT_PUBLIC_CLIENT_URI)
  const client = getClient();
  const { data } = await client.query({
    query: GET_PRODUCTS_BY_TAG,
    variables: { tag: "bestseller" },
  });

  return data.products.nodes.slice(0, 4);
}

export async function getNewProducts() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_PRODUCTS_BY_TAG,
    variables: { tag: "new" },
  });

  return data.products.nodes.slice(0, 4);
}

export const getProductBySlug = async (slug: string) => {
  const client = getClient();
  const { data } = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug: slug },
  });
  return data.product;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterObj: any = {};
    if (params.minPrice !== undefined || params.maxPrice !== undefined || params.color || params.size) {
      filterObj.price = [params.minPrice, params.maxPrice];
      if (params.color) filterObj.color = params.color.split(',');
      if (params.size) filterObj.size = params.size.split(',');
    }
    searchParams.set('query', JSON.stringify(filterObj));
    if (params.categoryId) searchParams.set('categoryId', params.categoryId);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.orderBy) searchParams.set('orderBy', params.orderBy);

    const res = await fetch(apiPath(`/v1/product?${searchParams.toString()}`));
    const json = await res.json();
    return { data: json.data, meta: json.meta };
  }
);
