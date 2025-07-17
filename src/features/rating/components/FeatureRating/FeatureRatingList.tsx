import RatingCard from '../ratingCard';
import { ReviewNode } from '@/types/review';

type FeatureRatingListProps = {
  reviews: ReviewNode[];
};

const FeatureRatingList = ({ reviews }: FeatureRatingListProps) => {
  if (!reviews || reviews.length === 0) {
    return <p>There are no reviews yet.</p>;
  }
  return (
    <>
      {reviews.map((review: ReviewNode) => (
        <RatingCard review={review} key={review?.id} />
      ))}
    </>
  );
};

export default FeatureRatingList;
