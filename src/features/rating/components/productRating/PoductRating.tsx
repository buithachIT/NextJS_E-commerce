import { Button } from '@/components/ui/button';
import FeatureRatingList from '../FeatureRating/FeatureRatingList';
import { CUSTOMER_REVIEWS } from '@/types/rating';

export default function ProductRating({
  reviews,
}: {
  reviews: CUSTOMER_REVIEWS[];
}) {
  return (
    <div className="flex flex-col">
      <div className="flex md:grid md:gap-4 md:grid-cols-2 flex-col justify-center">
        <FeatureRatingList reviews={reviews} />
      </div>
      <Button
        className="w-1/2 md:w-[200px] cursor-pointer mx-auto rounded-3xl h-[50px] md:mt-5"
        variant={'outline'}
      >
        Load More Reviews
      </Button>
    </div>
  );
}
