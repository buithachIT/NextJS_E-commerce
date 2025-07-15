import { HalfStar, Star } from './ui/icons';

export default function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <span key={i} className="text-yellow-500 pr-1">
          <Star />
        </span>
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <span key={i} className="text-yellow-500 pr-1">
          <HalfStar />
        </span>
      );
    }
  }
  return <span className="flex">{stars}</span>;
}
