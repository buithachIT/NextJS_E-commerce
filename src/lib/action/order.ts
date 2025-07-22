import { CREATE_ORDER_MUTATION } from '@/graphql/mutations/order';
import { decodeDatabaseId } from '@/helper/decoded';
import { getClient } from '../apollo/apollo-client';
import { CartItem } from '@/types/cartItem';
import { GET_ORDER_BY_UID } from '@/graphql/queries/order';
import { safeQuery } from '../utils/runQuery';
import { GetOrderByIdQuery } from '@/__generated__/graphql';

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  detailAddress: string;
  state: string;
  country: string;
  note?: string;
}
export async function createOrder(billingInfo: BillingInfo, cart: CartItem[], uid: number) {
  const client = getClient();
  const input = {
    customerId: uid,
    status: 'PENDING',
    billing: {
      firstName: billingInfo.firstName,
      lastName: billingInfo.lastName,
      email: billingInfo.email,
      phone: billingInfo.phone,
      address1: billingInfo.detailAddress,
      city: billingInfo.state,
      country: billingInfo.country,
    },
    lineItems: cart.map((item) => ({
      productId: decodeDatabaseId(item.productId),
      variationId: decodeDatabaseId(item.id),
      quantity: item.quantity,
    })),
    customerNote: billingInfo.note || '',
  };
  const { data } = await client.mutate({
    mutation: CREATE_ORDER_MUTATION,
    variables: { input },
  });

  return data?.createOrder?.order || null;
}

export const getOrderById = async (uid: number) => {
  const client = getClient();
  const { data, error } = await safeQuery<GetOrderByIdQuery>(
    client,
    GET_ORDER_BY_UID,
    { id: uid }
  );
  if (error || !data) return null;
  return data?.orders?.nodes ?? [];
};
