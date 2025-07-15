'use client';

import { useCart } from '@/contexts/CartContext';
import CartItemCard from './CartItemCard';

export default function CartFeature({ className }: { className: string }) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  function checkEmpty() {
    if (cart.length === 0) {
      return <p>Your cart is empty!</p>;
    }
  }
  return (
    <div className={`${className} md:w-3/5`}>
      {checkEmpty()}
      <div className="border rounded-2xl ">
        {cart.map((item) => (
          <div className="not-last:border-b mx-5" key={item.id}>
            <CartItemCard
              cartItem={item}
              onQuantityChange={(id, qty) => updateQuantity(id, qty)}
              onRemoveItem={(id) => removeFromCart(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
