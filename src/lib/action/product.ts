import { cache } from 'react';
import { apiPath } from '../api/utils';
import { getClient } from '../apollo/apollo-client';
import {
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS_BY_TAG,
} from '@/graphql/queries/product';
import { safeQuery } from '../utils/runQuery';
import {
  GetProductBySlugQuery,
  GetProductsByTagQuery,
} from '@/__generated__/graphql';

export async function getBestSellerProducts() {
  const client = getClient();
  const { data, error } = await safeQuery<GetProductsByTagQuery>(
    client,
    GET_PRODUCTS_BY_TAG,
    { tag: 'bestseller' }
  );

  if (error || !data) return [];

  return data.products?.nodes.slice(0, 4);
}

export async function getNewProducts() {
  const client = getClient();
  const { data, error } = await safeQuery<GetProductsByTagQuery>(
    client,
    GET_PRODUCTS_BY_TAG,
    { tag: 'new' }
  );

  if (error || !data) return [];

  return data.products?.nodes.slice(0, 4);
}

export const getProductBySlug = async (slug: string) => {
  const client = getClient();
  const { data, error } = await safeQuery<GetProductBySlugQuery>(
    client,
    GET_PRODUCT_BY_SLUG,
    { slug }
  );

  if (error || !data) return null;

  return data.product;
};

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
