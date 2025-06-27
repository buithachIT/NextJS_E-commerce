import RatingCard from "../ratingCard"
import { getCustomerRating } from "@/lib/action/rating";
import { CUSTOMER_REVIEWS } from "@/types/rating";

const FeatureRatingList = async () => {
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
