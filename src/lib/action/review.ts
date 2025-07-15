import { getClient } from '../apollo/apollo-client';
import { safeQuery } from '../utils/runQuery';
import { GetProductReviewsQuery } from '@/__generated__/graphql';
import { GET_REVIEWS_BY_PRODUCT } from '@/graphql/queries/rating';

export const getReviewsByProduct = async (slug: string) => {
  const client = getClient();
  const { data, error } = await safeQuery<GetProductReviewsQuery>(
    client,
    GET_REVIEWS_BY_PRODUCT,
    { slug }
  );
  if (error || !data) return null;
  return data.product?.reviews?.nodes ?? [];
};
