import { HalfStar, Star } from './ui/icons';

export default function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Sao đầy
      stars.push(
        <span key={i} className="text-yellow-500">
          <Star />
        </span>
      );
    } else if (rating >= i - 0.5) {
      // Sao nửa
      stars.push(
        <span key={i} className="text-yellow-500">
          <HalfStar />
        </span>
      );
    }
  }
  return <span className="flex">{stars}</span>;
}
