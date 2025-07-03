import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailSkeleton() {
  return (
    <div className="md:flex gap-8">
      {/* Thumbnails & Ảnh lớn */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <Skeleton className="aspect-square rounded-xl w-full" />
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Nội dung bên phải */}
      <div className="w-full md:w-1/2 space-y-4 mt-6 md:mt-0">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-5 w-1/4" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-10 rounded-full bg-red-200" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div>
          <Skeleton className="h-5 w-1/3 mb-2" />
          <div className="flex gap-3">
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="w-9 h-9 rounded-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-5 w-1/3 mb-2" />
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-9 rounded-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-12 w-1/2 rounded-full mt-4" />
      </div>
    </div>
  );
}
