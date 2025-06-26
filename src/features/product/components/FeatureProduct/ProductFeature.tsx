import ProductSkeleton from '@/components/skeleton/productSekeleton';
import ProductFeatureList from '@/features/product/components/FeatureProduct/ProductFeatureList'
import { Suspense } from 'react';
type Props = {
    type: 'new' | 'bestseller';
    title: string;
};

export default function ProductFeature({ type, title }: Props) {

    return (
        <div className="px-4 md:px-20 py-10">
            <h2 className="text-3xl md:text-6xl font-bold text-center mb-10 font-display">
                {title}
            </h2>
            <Suspense fallback={<ProductSkeleton />}><ProductFeatureList type={type} title={title} /></Suspense>
            <div className="flex justify-center"> <button
                className="w-full px-8 py-2 text-md border md:w-1/6 md:h-15 border-gray-200 rounded-full md:text-lg font-medium hover:bg-gray-100 transition"
            >
                View All
            </button></div>
        </div>
    );
}
