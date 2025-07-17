import { GetAllCategoriesQuery } from '@/__generated__/graphql';

export type CategoryNode = NonNullable<
  GetAllCategoriesQuery['productCategories']
>['nodes'][number];
