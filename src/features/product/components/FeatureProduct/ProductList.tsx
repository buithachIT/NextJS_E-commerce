'use client';
import { Product } from '@/types/product';
import ProductCard from '../productCard';
import useIsMobile from '@/hooks/useIsMobile';
import { useMemo } from 'react';

export default function ProductList({
  products,
  className,
}: {
  products: Product[];
  className: string;
}) {
  const isMobile = useIsMobile();
  const displayed = useMemo(
    () => (isMobile ? products.slice(0, 6) : products),
    [isMobile, products]
  );

  return (
    <div className={`pt-5 md:pt-0 grid gap-4 ${className}`}>
      {displayed.map((product: Product) => (
        <div className="fade-in-up" key={product.id}>
          <ProductCard className='w-full' product={product} />
        </div>
      ))}
    </div>
  );
}
