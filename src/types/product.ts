import {
  GetLatestProductsQuery,
  GetProductBySlugQuery,
  GetProductsByCategoryQuery,
} from '@/__generated__/graphql';
import { GetProductByIdQuery, StockStatusEnum } from '@/__generated__/types';

export { StockStatusEnum };

export type ProductList = NonNullable<
  NonNullable<GetLatestProductsQuery['products']>['nodes']
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
  regularPrice?: string | null | undefined;
};
export type ProductDetailType = NonNullable<GetProductByIdQuery['product']>;
export type VariationNode = {
  id: string;
  name?: string | null;
  price?: string | null;
  sku?: string | null;
  stockStatus?: StockStatusEnum | null;
  image?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};
