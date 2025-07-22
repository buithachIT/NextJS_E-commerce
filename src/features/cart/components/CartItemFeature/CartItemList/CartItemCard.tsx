import { QuantityPicker } from '@/components/ui/customQuantityPicker';
import { TrashIconSVG } from '@/components/ui/icons';
import { extractPriceInfo } from '@/helper/formatCurrency';
import { CartItem } from '@/types/cartItem';
import Image from 'next/image';

type CartItemCardProps = {
  cartItem: CartItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
};

export default function CartItemCard({
  cartItem,
  onQuantityChange,
  onRemoveItem,
}: CartItemCardProps) {
  const { salePrice } = extractPriceInfo(
    cartItem.price.toString(),
    cartItem.price.toString()
  );
  return (
    <div className="w-full py-5">
      <div key={cartItem.id} className="flex w-full relative">
        <div className="w-1/3 md:w-1/6 h-full aspect-square mr-2">
          <Image
            src={cartItem.image}
            width={800}
            height={800}
            className="object-cover md:aspect-square rounded-2xl"
            alt={cartItem.name}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <h4 className="text-md font-semibold md:text-lg pr-5">
              {cartItem.productName}
            </h4>
            <div className="text-xs md:text-md text-gray-600">
              <p>
                <strong>Size:</strong> {cartItem.size}
              </p>
              <p>
                <strong>Color:</strong> {cartItem.color}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-xl font-bold md:text-2xl">{salePrice}</h2>
            <QuantityPicker
              className="w-1/2 h-[30px] md:w-1/5 md:h-[40px]"
              value={cartItem.quantity}
              onChange={(newQuantity) =>
                onQuantityChange(cartItem.id, newQuantity)
              }
            />
          </div>
        </div>
        <span
          className="absolute top-1 right-1 cursor-pointer"
          onClick={() => onRemoveItem(cartItem.id)}
        >
          <TrashIconSVG />
        </span>
      </div>
    </div>
  );
}
