import RatingCard from '../ratingCard';
import { CUSTOMER_REVIEWS } from '@/types/rating';

type FeatureRatingListProps = {
  reviews: CUSTOMER_REVIEWS[];
};

const FeatureRatingList = ({ reviews }: FeatureRatingListProps) => {
  if (!reviews || reviews.length === 0) {
    return <p>There are no reviews yet.</p>;
  }
  return (
    <>
      {reviews.map((review: CUSTOMER_REVIEWS) => (
        <RatingCard review={review} key={review.id} />
      ))}
    </>
  );
};

export default FeatureRatingList;
