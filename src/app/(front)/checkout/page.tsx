'use client';
import Breadcrumb from '@/components/breadcrumb';
import CartItemSkeleton from '@/components/skeletons/cartItemSkeleton';
import { useCart } from '@/contexts/CartContext';
import CartFeature from '@/features/cart/components/CartItemFeature/CartItemList/CartFeature';
import CartSummary from '@/features/cart/components/CartItemFeature/CartSummary/OrderSummarySale';
import BillingForm from '@/features/checkout/components/BillingForm/BillingForm';
import { Suspense } from 'react';

export default function CountriesPage() {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => {
    const priceNum =
      typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return sum + priceNum * item.quantity;
  }, 0);
  return (
    <>
      <Breadcrumb />
      <div className="px-5 md:px-25 md:mb-20">
        <h2 className="font-bold font-display text-3xl pb-5 md:text-4xl">
          CHECKOUT
        </h2>
        <div className="md:w-full md:flex md:flex-row-reverse md:py-5 md:gap-6">
          <div className="md:w-2/3 md:gap-6 sticky">
            <Suspense fallback={<CartItemSkeleton />}>
              <CartFeature className="md:w-full" />
            </Suspense>
            <CartSummary subtotal={subtotal} className="hide-btn mt-10" />
          </div>
          <div className="md:w-2/3">
            <div>
              <BillingForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
