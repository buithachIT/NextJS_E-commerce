import BrowseByCategory from '@/components/banners/BrowseByCategory';
import HeroSection from '@/components/hero/hero';
import FeatureRating from '@/features/rating/components/FeatureRating/FeatureRating';
import ProductFeatureByType from '@/features/product/components/FeatureProduct/ProductFeatureByType';
import { Fragment, Suspense } from 'react';
import RatingCardSkeleton from '@/components/skeletons/ratingSkeleton';

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <ProductFeatureByType type="new" title="New Arrivals" className="" />
      <hr className="my-4 w-5/6  mx-auto border-t border-gray-200" />
      <ProductFeatureByType
        type="bestseller"
        title="Top Selling"
        className=""
      />
      <BrowseByCategory />
      <Suspense fallback={<RatingCardSkeleton />}>
        <FeatureRating />
      </Suspense>
    </Fragment>
  );
}
