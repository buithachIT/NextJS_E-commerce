'use client';
import CartSummary from './OrderSummarySale';
import { useCart } from '@/contexts/CartContext';

export default function OrderSummary() {
  const { cart } = useCart();

  const subtotal = cart.reduce((sum, item) => {
    const priceNum =
      typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return sum + priceNum * item.quantity;
  }, 0);
  return (
    <div className="my-5 md:max-h-[400px] md:my-0 md:w-2/5 grid gap-6">
      <CartSummary subtotal={subtotal} />
    </div>
  );
}
