import { ReviewNode } from '@/types/review';
import { CheckCircle } from 'lucide-react';
import StarRating from '@/components/starRating';
import parse from 'html-react-parser';
import { formatDateToLongString } from '@/helper/format';
export default function RatingCard({ review }: { review: ReviewNode }) {
  return (
    <div className="rounded-xl mb-5 border border-gray-200 p-6 shadow-sm min-w-[340px]">
      <div className="flex gap-1 text-yellow-500 mb-4">
        <StarRating rating={review?.rating || 5} />
      </div>

      <div className="flex items-center gap-2 font-bold text-xl text-gray-900 mb-2">
        {review.author?.node.name}
        {review.id ? (
          <CheckCircle className="text-green-500" size={18} />
        ) : (
          <></>
        )}
      </div>
      <span className="text-gray-600 leading-relaxed text-sm">
        {parse(review.content || 'error')}
      </span>
      <span className="text-gray-600 leading-relaxed font-medium text-sm">
        Post on {formatDateToLongString(review.date || '')}
      </span>
    </div>
  );
}
