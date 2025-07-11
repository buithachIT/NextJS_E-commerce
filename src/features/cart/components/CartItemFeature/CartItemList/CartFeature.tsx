import { getCartData } from '@/lib/action/cart';
import { CartItem } from '@/types/cartItem';
import CartItemList from './CartItemList';

export default async function CartFeature() {
  const res = await getCartData();
  const cartItem: CartItem[] = res.data;
  if (!res?.data || res.data.length === 0) {
    return <p>Giỏ hàng trống</p>;
  }
  return (
    <>
      <CartItemList cartItem={cartItem} />
    </>
  );
}
