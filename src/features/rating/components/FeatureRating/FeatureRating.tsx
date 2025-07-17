import FeatureRatingList from './FeatureRatingList';
import RatingSlider from '../ratingSlider';
import { Suspense } from 'react';
import RatingCardSkeleton from '@/components/skeletons/ratingSkeleton';
import { happyReview } from '@/consts/happy-review';

const FeatureRating = () => {
  return (
    <section className="mt-10 mx-5">
      <RatingSlider>
        <Suspense fallback={<RatingCardSkeleton />}>
          <FeatureRatingList reviews={happyReview} />
        </Suspense>
      </RatingSlider>
    </section>
  );
};

export default FeatureRating;
