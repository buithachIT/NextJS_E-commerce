import ProductSkeleton from '@/components/skeletons/productSekeleton';
import ProductFeatureList from '@/features/product/components/FeatureProduct/ProductFeatureListByType';
import { Suspense } from 'react';
type Props = {
  type: 'new' | 'bestseller';
  title: string;
  className: string;
};

export default function ProductFeatureByType({
  type,
  title,
  className,
}: Props) {
  return (
    <div
      className={`px-5 md:px-15 py-5 animate-in slide-in-from-bottom duration-700 delay-300 ${className}`}
    >
      <h2 className="text-3xl md:mt-10 md:text-5xl font-bold text-center mb-10 font-display">
        {title}
      </h2>
      <div className="w-full flex justify-center">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductFeatureList type={type} title={title} />
        </Suspense>
      </div>
      <div className="flex justify-center">
        {' '}
        <button className="w-full cursor-pointer px-8 py-2 text-md border md:w-1/6 md:h-13 border-gray-200 rounded-full md:text-lg font-medium hover:bg-primary hover:text-white transition">
          View All
        </button>
      </div>
    </div>
  );
}
