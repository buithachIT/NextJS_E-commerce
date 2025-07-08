export default function ProductSkeleton() {
  return (
    <div className="flex mx-auto gap-10 justify-between overflow-x-auto pb-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="min-w-[200px] md:min-w-[250px] rounded-lg border border-gray-200 p-4 animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/5] bg-gray-200 rounded mb-4" />

            {/* Name Placeholder */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

            {/* Price Placeholder */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
    </div>
  );
}
