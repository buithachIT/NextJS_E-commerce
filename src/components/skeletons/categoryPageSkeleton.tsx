import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCategoryPage() {
  return (
    <div className="md:flex gap-6 px-5 md:px-25 pb-10">
      {/* Filter skeleton */}
      <div className="hidden md:block w-[250px] space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-40 w-full" />
      </div>

      {/* Product skeleton */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/5] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
      </div>
    </div>
  );
}
