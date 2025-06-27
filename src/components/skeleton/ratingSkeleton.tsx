export default function RatingCardSkeleton() {
  return (
    <>
      <div className="rounded-xl border border-gray-200 p-6 shadow-sm max-w-md animate-pulse space-y-4">
        {/* Stars */}
        <div className="flex gap-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-5 h-5 bg-yellow-100 rounded" />
            ))}
        </div>

        {/* Name + verified */}
        <div className="flex items-center gap-2">
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <div className="w-4 h-4 bg-green-100 rounded-full" />
        </div>

        {/* Feedback text */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-200 rounded" />
          <div className="w-5/6 h-3 bg-gray-200 rounded" />
          <div className="w-3/4 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 p-6 shadow-sm max-w-md animate-pulse space-y-4">
        {/* Stars */}
        <div className="flex gap-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-5 h-5 bg-yellow-100 rounded" />
            ))}
        </div>

        {/* Name + verified */}
        <div className="flex items-center gap-2">
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <div className="w-4 h-4 bg-green-100 rounded-full" />
        </div>

        {/* Feedback text */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-200 rounded" />
          <div className="w-5/6 h-3 bg-gray-200 rounded" />
          <div className="w-3/4 h-3 bg-gray-200 rounded" />
        </div>
      </div>
    </>
  );
}
