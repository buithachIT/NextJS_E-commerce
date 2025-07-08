import { GetProductByIdQuery } from '@/__generated__/graphql';

export type Product = NonNullable<GetProductByIdQuery['product']>;
