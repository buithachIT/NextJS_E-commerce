'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuantityPicker } from '@/components/ui/customQuantityPicker';
import { isLightColor } from '@/helper/islight';

import { parseColorAndSize } from '@/helper/parseColorAndSize';

import { ProductTypeBySlugQuery, VariationType } from '@/types/product';
import toast from 'react-hot-toast';
import { CartItem } from '@/types/cartItem';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailVariant({
  product,
}: {
  product: ProductTypeBySlugQuery;
}) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const colorMap: Record<string, string[]> = {};
  const [quantityPicker, setQuantityPicker] = useState(1);
  const { addToCart } = useCart();
  if (product.__typename === 'VariableProduct' && product.variations?.nodes) {
    product.variations.nodes.forEach((variation: VariationType) => {
      const { color, size } = parseColorAndSize(variation.name || '');
      if (!colorMap[color]) colorMap[color] = [];
      if (size && !colorMap[color].includes(size)) {
        colorMap[color].push(size);
      }
    });
  }

  useEffect(() => {
    const firstColor = Object.keys(colorMap)[0];
    if (firstColor && !selectedColor) {
      setSelectedColor(firstColor);
    }
  }, [product, selectedColor]);

  const colors = Object.keys(colorMap);
  const sizes = selectedColor ? colorMap[selectedColor] : [];

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return toast.error('Please select a color and size.');
    }

    const matchedVariant =
      product.__typename === 'VariableProduct'
        ? product.variations?.nodes.find((variation: VariationType) => {
            const { color, size } = parseColorAndSize(variation.name || '');
            return color === selectedColor && size === selectedSize;
          })
        : null;

    if (!matchedVariant) {
      return toast.error('No matching variant found.');
    }

    const newCartItem: CartItem = {
      id: matchedVariant.id.toString(),
      productId: product.id.toString(),
      productName: product.name ?? '',
      name: matchedVariant.name ?? '',
      color: selectedColor,
      size: selectedSize,
      image: matchedVariant.image?.sourceUrl || '',
      price: parseFloat(matchedVariant.price ?? '0'),
      quantity: quantityPicker,
    };

    addToCart(newCartItem);
    toast.success('Added to cart!');
  };

  return (
    <div className="md:items-end mx-auto">
      {colors.length > 0 && (
        <div>
          <p className="text-md text-gray-400">Select Colors</p>
          <div className="flex gap-3 mt-3">
            {colors.map((color) => {
              const isSelected = color === selectedColor;
              const isLight = isLightColor(color.toLowerCase());
              return (
                <Button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedSize(null);
                  }}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center relative transition"
                  style={{
                    backgroundColor: color,
                    border: '1px solid #ccc',
                  }}
                  title={color}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 ${isLight ? 'text-black' : 'text-white'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      <hr className="my-4 w-full mx-auto border-t border-gray-300" />
      {sizes.length > 0 && (
        <div>
          <p className="text-md text-gray-400">Choose Size</p>
          <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-hide">
            {sizes.map((size) => (
              <Button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 cursor-pointer md:h-[50px] py-2 rounded-full border text-sm ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-[#f0f0f0] text-gray-500 border-gray-300'
                } hover:border-black`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}
      <hr className="my-4 w-full  mx-auto border-t border-gray-300" />
      <div className="flex pt-5 gap-3">
        <QuantityPicker
          min={1}
          max={10}
          value={quantityPicker}
          onChange={setQuantityPicker}
          className="w-1/3 md:h-[50px] rounded-3xl h-10"
        />
        <Button
          onClick={handleAddToCart}
          className="w-3/5 rounded-3xl h-10 md:h-[50px] cursor-pointer flex-end"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
