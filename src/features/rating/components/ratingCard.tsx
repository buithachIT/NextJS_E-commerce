import { CUSTOMER_REVIEWS } from '@/types/rating';
import { CheckCircle } from 'lucide-react';
import StarRating from '@/components/starRating';
export default function RatingCard({ review }: { review: CUSTOMER_REVIEWS }) {
  return (
    <div className="rounded-xl mb-5 border border-gray-200 p-6 shadow-sm min-w-[340px]">
      {/* Rating stars */}
      <div className="flex gap-1 text-yellow-500 mb-4">
        <StarRating rating={review.rating} />
      </div>

      {/* Name + verified */}
      <div className="flex items-center gap-2 font-bold text-xl text-gray-900 mb-2">
        {review.name}
        {review.verified ? (
          <CheckCircle className="text-green-500" size={18} />
        ) : (
          <></>
        )}
      </div>
      {/* Feedback text */}
      <p className="text-gray-600 leading-relaxed text-sm">{review.comment}</p>
    </div>
  );
}
