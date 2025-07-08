import ProductDetailSkeleton from '@/components/skeletons/productdetailskeleton';

export default function Loading() {
  return (
    <div className="p-4 md:p-8">
      <ProductDetailSkeleton />
    </div>
  );
}
