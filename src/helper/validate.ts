import { CartItem } from '@/types/cartItem';
import { parseColorAndSize } from './parseColorAndSize';
import { GET_VARIATIONS } from '@/graphql/queries/product';
import { getClient } from '@/lib/apollo/apollo-client';

const decodeDatabaseId = (globalId: string): number => {
  const decoded = atob(globalId);
  return parseInt(decoded.split(':')[1]);
};

export async function validateCartFromLocalStorage(): Promise<
  CartItem[] | null
> {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem('cart');
  if (!raw) return null;

  let cart: CartItem[];
  try {
    cart = JSON.parse(raw);
  } catch (err) {
    console.error('Invalid cart JSON:', err);
    return null;
  }

  const validCart: CartItem[] = [];

  for (const item of cart) {
    const client = getClient();

    const { data } = await client.query({
      query: GET_VARIATIONS,
      variables: { id: item.productId },
      fetchPolicy: 'no-cache',
    });

    const variations = data?.product?.variations?.nodes;
    if (!variations) continue;

    const itemDatabaseId = decodeDatabaseId(item.id);
    const matched = variations.find(
      (v: { databaseId: number }) => v.databaseId === itemDatabaseId
    );
    if (!matched) continue;

    const parsed = parseColorAndSize(matched.name);
    const matchedPrice = Math.round(parseFloat(matched.price));

    if (
      parsed.color === item.color &&
      parsed.size === item.size &&
      matchedPrice === item.price
    ) {
      validCart.push(item);
    }
  }

  return validCart.length > 0 ? validCart : null;
}
