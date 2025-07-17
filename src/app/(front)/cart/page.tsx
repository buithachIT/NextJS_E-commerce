import Breadcrumb from '@/components/breadcrumb';
import CartItemSkeleton from '@/components/skeletons/cartItemSkeleton';
import CartFeature from '@/features/cart/components/CartItemFeature/CartItemList/CartFeature';
import OrderSummary from '@/features/cart/components/CartItemFeature/CartSummary/OrderSummary';
import { Suspense } from 'react';

const CartPage = () => {
  return (
    <>
      <Breadcrumb />
      <div className="px-5 md:px-25 md:mb-20">
        <h2 className="font-bold font-display text-3xl pb-5 md:text-4xl">
          YOUR CART
        </h2>
        <div className="md:w-full">
          <div className="md:flex md:w-full md:gap-6">
            <Suspense fallback={<CartItemSkeleton />}>
              <CartFeature className="" />
            </Suspense>
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
};
export default CartPage;
