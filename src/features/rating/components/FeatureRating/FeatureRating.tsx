import FeatureRatingList from './FeatureRatingList';
import RatingSlider from '../ratingSlider';
import { getCustomerRating } from '@/lib/action/rating';
import { Suspense } from 'react';
import RatingCardSkeleton from '@/components/skeletons/ratingSkeleton';


const FeatureRating = async () => {
  const { data: review } = await getCustomerRating();
  return (
    <section className="mt-10 mx-5">
      <RatingSlider>
        <Suspense fallback={<RatingCardSkeleton />}>
          <FeatureRatingList reviews={review} />
        </Suspense>
      </RatingSlider>
    </section>
  );
};

export default FeatureRating;
