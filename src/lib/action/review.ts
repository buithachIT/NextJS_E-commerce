import { getClient } from '../apollo/apollo-client';
import { safeQuery } from '../utils/runQuery';
import { GetProductReviewsQuery } from '@/__generated__/graphql';
import {
  CREATE_REVIEW,
  GET_REVIEWS_BY_PRODUCT,
} from '@/graphql/queries/rating';
import { runMutation } from '../utils/runMutation';
import { ReviewFormData } from '@/features/product/components/ProductDetail/ProductDescriptionSection/ProductReview/ProductReview';

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

export const createReviewByProduct = async (values: ReviewFormData) => {
  return await runMutation(
    CREATE_REVIEW,
    { input: values },
    ['createProductReview', 'comment'],
    'Tạo đánh giá thất bại'
  );
};
