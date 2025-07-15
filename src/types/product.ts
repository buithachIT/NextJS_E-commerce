import {
  GetProductBySlugQuery,
  GetProductsByCategoryQuery,
  GetProductsByTagQuery,
} from '@/__generated__/graphql';
import { GetProductByIdQuery, StockStatusEnum } from '@/__generated__/types';

export type ProductList = NonNullable<
  NonNullable<GetProductsByTagQuery['products']>['nodes']
>;

export type Product = ProductList[number];

export type ProductDetail = NonNullable<GetProductByIdQuery['product']>;

export type ProductCategoryListType = NonNullable<
  GetProductsByCategoryQuery['products']
>['nodes'][number];

export type ProductTypeBySlugQuery = NonNullable<
  GetProductBySlugQuery['product']
>;

export type VariationType = {
  __typename?: 'SimpleProductVariation' | undefined;
  name?: string | null | undefined;
  price?: string | null | undefined;
  sku?: string | null | undefined;
  stockStatus?: StockStatusEnum | null | undefined;
};
