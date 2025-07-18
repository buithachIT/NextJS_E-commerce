'use client';
import { useState } from 'react';
import { calculateDiscount } from '@/features/cart/utils/calculate-discount';
import { PROMO_CODES } from '@/mocks/datas/promoCodes';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SaleTicket } from '@/components/ui/icons';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartSummary({
  subtotal,
  className,
}: {
  subtotal: number;
  className?: string;
}) {
  const { cart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [applied, setApplied] = useState<null | (typeof PROMO_CODES)[0]>(null);

  const deliveryFee = 15;
  const discount = applied
    ? calculateDiscount(subtotal, applied.value, applied.type)
    : 0;
  const total = subtotal + deliveryFee - discount;

  const handleApply = () => {
    const found = PROMO_CODES.find((p) => p.code === promoCode.toUpperCase());
    if (found) setApplied(found);
    else toast.error('Invalid code');
  };

  return (
    <div
      className={`p-6 mb-5 bg-white rounded-xl border space-y-4 ${className}`}
    >
      <h2 className="text-xl md:text-2xl font-semibold">Order Summary</h2>

      <div className="flex justify-between md:text-[20px]">
        <span className="text-[#666666]">Subtotal</span>
        <span className="font-bold">${subtotal}</span>
      </div>

      {applied && (
        <div className="flex justify-between text-red-500 md:text-[20px]">
          <span className="text-[#666666]">
            Discount (
            {applied.type === 'percent'
              ? `-${applied.value}%`
              : `-$${applied.value}`}
            )
          </span>
          <span className="font-bold">-${discount}</span>
        </div>
      )}

      <div className="flex justify-between md:text-[20px]">
        <span className="text-[#666666]">Delivery Fee</span>
        <span className="font-bold">${deliveryFee}</span>
      </div>

      <hr />

      <div className="flex justify-between text-lg md:text-[20px]">
        <span>Total</span>
        <span className="font-bold">${total}</span>
      </div>

      {/* Promo Code */}
      <div className="flex items-center gap-2 mt-4">
        <div className="relative flex-1">
          <Input
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 text-sm md:h-[50px]"
            placeholder="Add promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SaleTicket className="w-5 h-5" />
          </div>
        </div>
        <Button
          onClick={handleApply}
          className="px-5 py-2 rounded-full md:h-[50px]"
        >
          Apply
        </Button>
      </div>
      {cart && cart.length > 0 ? (
        <Button className="w-full py-3 rounded-full text-center mt-2 md:h-[50px]">
          <Link href="/checkout">Go to Checkout →</Link>
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
