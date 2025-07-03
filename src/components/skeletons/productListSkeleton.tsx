export default function ProductListSkeleton() {
  return (
    <div>
      <h2>
        <div className="h-10 w-20 bg-gray-200 rounded" />
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col items-start md:min-w-[280px] md:mb-5 md:mt-5 rounded-xl md:p-4 animate-pulse">
          {/* Ảnh */}
          <div className="aspect-square w-full bg-gray-200 rounded-xl mb-3" />

          {/* Tên sản phẩm */}
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2 w-full">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>

          {/* Giá */}
          <div className="flex items-center gap-2 w-full">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-red-200 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col items-start md:min-w-[280px] md:mb-5 md:mt-5 rounded-xl md:p-4 animate-pulse">
          {/* Ảnh */}
          <div className="aspect-square w-full bg-gray-200 rounded-xl mb-3" />

          {/* Tên sản phẩm */}
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2 w-full">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>

          {/* Giá */}
          <div className="flex items-center gap-2 w-full">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-green-200 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col items-start md:min-w-[280px] md:mb-5 md:mt-5 rounded-xl md:p-4 animate-pulse">
          {/* Ảnh */}
          <div className="aspect-square w-full bg-gray-200 rounded-xl mb-3" />

          {/* Tên sản phẩm */}
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2 w-full">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>

          {/* Giá */}
          <div className="flex items-center gap-2 w-full">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-red-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
