import { GetOrderByIdQuery } from '@/__generated__/graphql';

export type OrderNode = NonNullable<GetOrderByIdQuery['orders']>['nodes'][0];
export type OrderDetailLineItemNode = NonNullable<
  OrderNode['lineItems']
>['nodes'][0];
export type OrderDetailVariationNode = NonNullable<
  OrderDetailLineItemNode['variation']
>['node'];
export type OrderDetailProductNode = NonNullable<
  OrderDetailLineItemNode['product']
>['node'];
