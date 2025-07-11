import { QuantityPicker } from '@/components/ui/customQuantityPicker';
import { TrashIconSVG } from '@/components/ui/icons';
import { CartItem } from '@/types/cartItem';
import Image from 'next/image';

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
  return (
    <div className="w-full p-3 not-last:border-b">
      <div key={cartItem.id} className="flex w-full relative">
        <div className="w-1/3 md:w-1/6 h-full aspect-square mr-2">
          <Image
            src={cartItem.variant.thumbnail}
            width={500}
            height={500}
            className="object-cover aspect-square rounded-2xl"
            alt={cartItem.productName}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <h4 className="text-md font-semibold md:text-lg">
              {cartItem.productName}
            </h4>
            <div className="text-xs md:text-md text-gray-600">
              <p>
                <strong>Size:</strong> {cartItem.variant.size}
              </p>
              <p>
                <strong>Color:</strong> {cartItem.variant.colorName}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-xl font-bold md:text-2xl">${cartItem.price}</h2>
            <QuantityPicker
              className="w-1/2 h-[30px] md:w-1/5 md:h-[40px]"
              value={cartItem.quantity}
            />
          </div>
        </div>
        <span className="absolute top-1 right-1">
          <TrashIconSVG />
        </span>
      </div>
    </div>
  );
}
