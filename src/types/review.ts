import { GetProductReviewsQuery } from '@/__generated__/graphql';

export type ReviewNode = NonNullable<
  NonNullable<
    NonNullable<GetProductReviewsQuery['product']>['reviews']
  >['nodes']
>[number];
