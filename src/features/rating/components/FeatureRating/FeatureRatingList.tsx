import RatingCard from "../ratingCard"
import { getCustomerRating } from "@/lib/action/rating";
import { CUSTOMER_REVIEWS } from "@/types/rating";

const FeatureRatingList = async () => {
    // Giả lập delay để thấy skeleton
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { data: reviews } = await getCustomerRating();

    return (
        <>
            {reviews.map((review: CUSTOMER_REVIEWS) => (
                <RatingCard review={review} key={review.id} />
            ))}
        </>
    )
}
export default FeatureRatingList
