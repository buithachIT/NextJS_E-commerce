import BrowseByCategory from '@/components/banner/BrowseByCategory';
import HeroSection from '@/components/hero/hero';
import FeatureRating from '@/features/rating/components/FeatureRating/FeatureRating';
import ProductFeature from '@/features/product/components/FeatureProduct/ProductFeature';
import { Fragment } from 'react';

export default function Home() {

  return (
    <Fragment>
      <HeroSection />
      <ProductFeature type="new" title="New Arrivals" className='' />
      <hr className="my-4 w-5/6  mx-auto border-t border-gray-200" />
      <ProductFeature type="bestseller" title="Top Selling" className='' />
      <BrowseByCategory />
      <FeatureRating />
    </Fragment>
  );
}
