import { Suspense } from 'react';
import FeatureRatingList from './FeatureRatingList';
import RatingSlider from '../ratingSlider';
import RatingCardSkeleton from '@/components/skeleton/ratingSkeleton';

const FeatureRating = () => {
  return (
    <section className="mt-10 mx-5">
      <RatingSlider>
        <Suspense fallback={<RatingCardSkeleton />}>
          <FeatureRatingList />
        </Suspense>
      </RatingSlider>
    </section>
  );
};

export default FeatureRating;
