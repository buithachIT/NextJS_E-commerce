import { getClient } from '../apollo/apollo-client';
import {
  GET_LATEST_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_TAG,
} from '@/graphql/queries/product';
import { safeQuery } from '../utils/runQuery';
import {
  GetProductsByTagQuery,
  GetProductBySlugQuery,
  GetProductsByCategoryQuery,
  GetLatestProductsQuery,
} from '@/__generated__/graphql';
import { GET_SIZE_COLOR } from '@/graphql/queries/sizeColor';

export async function getNewProducts() {
  const client = getClient();
  const { data, error } = await safeQuery<GetLatestProductsQuery>(
    client,
    GET_LATEST_PRODUCTS
  );

  if (error || !data) return [];

  return data.products?.nodes.slice(0, 4);
}

export async function getBestSellerProducts() {
  const client = getClient();
  const { data, error } = await safeQuery<GetProductsByTagQuery>(
    client,
    GET_PRODUCTS_BY_TAG,
    { tag: 'bestseller' }
  );

  if (error || !data) return [];

  return data.products?.nodes;
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

export const getProductByCategory = async (slug: string) => {
  const client = getClient();
  const { data, error } = await safeQuery<GetProductsByCategoryQuery>(
    client,
    GET_PRODUCTS_BY_CATEGORY,
    {
      categoryIn: [slug],
    }
  );

  if (error || !data) return null;

  return data.products?.nodes ?? [];
};

export async function getSizeColor() {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_SIZE_COLOR,
    });

    return {
      colors: data?.allPaColor?.nodes ?? [],
      sizes: data?.allPaSize?.nodes ?? [],
    };
  } catch (error) {
    console.error('Error fetching size/color:', error);
    return {
      colors: [],
      sizes: [],
    };
  }
}
