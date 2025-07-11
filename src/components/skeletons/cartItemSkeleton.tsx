export default function CartItemSkeleton() {
  return (
    <div className="p-3 animate-pulse">
      <div className="flex items-start gap-4 pb-4 border-b last:border-b-0">
        {/* Ảnh */}
        <div className="w-20 h-20 bg-gray-200 rounded-lg" />

        {/* Nội dung */}
        <div className="flex-1 flex flex-col justify-between gap-2">
          <div className="space-y-2">
            <div className="w-2/3 h-4 bg-gray-200 rounded" />
            <div className="w-1/2 h-3 bg-gray-200 rounded" />
            <div className="w-1/3 h-3 bg-gray-200 rounded" />
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="w-12 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Nút xóa */}
        <div className="w-5 h-5 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}
