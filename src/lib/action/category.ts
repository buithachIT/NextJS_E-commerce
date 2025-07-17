import { cache } from 'react';
import { getClient } from '../apollo/apollo-client';
import { safeQuery } from '../utils/runQuery';
import { GET_CATEGORIES } from '@/graphql/queries/category';
import { GetAllCategoriesQuery } from '@/__generated__/graphql';

export const getCategory = cache(async () => {
  const client = getClient();
  const { data, error } = await safeQuery<GetAllCategoriesQuery>(
    client,
    GET_CATEGORIES
  );

  if (error || !data) return null;

  return data.productCategories?.nodes;
});
