import { GetProductsByTagQuery } from '@/__generated__/graphql';
import { GetProductByIdQuery } from '@/__generated__/types';

export type ProductList = NonNullable<
  NonNullable<GetProductsByTagQuery['products']>['nodes']
>;

export type Product = ProductList[number];

export type ProductDetail = NonNullable<GetProductByIdQuery['product']>;
