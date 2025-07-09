/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import StarRating from '@/components/starRating';
import { Button } from '@/components/ui/button';
import { QuantityPicker } from '@/components/ui/customQuantityPicker';
import { isLightColor } from '@/helper/islight';
import { getPriceInfo } from '../../utils/formatCurrency';
import parse from 'html-react-parser';

function parseColorAndSize(name: string) {
  const match = name.match(/- (.+),\s*(\w+)$/);
  if (!match) return { color: '', size: '' };
  return { color: match[1], size: match[2] };
}

export default function ProductDetailVariant({
  product,
}: {
  product: Product;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const colorMap: Record<string, string[]> = {};

  if (product.__typename === 'VariableProduct' && product.variations) {
    product.variations.nodes.forEach((variation) => {
      const { color, size } = parseColorAndSize(variation.name || '');
      if (!colorMap[color]) colorMap[color] = [];
      if (!colorMap[color].includes(size)) {
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

  const isSimple = product.__typename === 'SimpleProduct';
  const isVariable = product.__typename === 'VariableProduct';

  const price = isSimple || isVariable ? product.price : null;
  const regularPrice = isSimple || isVariable ? product.regularPrice : null;
  const { displayPrice, oldPrice, discountPercent } = getPriceInfo(price, regularPrice);

  return (
    <div className="md:flex-col md:pl-5 md:w-1/2 md:justify-between md:h-[520px]">
      <h2 className="md:text-[40px] text-2xl md:pt-0 pt-5 font-display pb-5 font-bold">
        {product.name}
      </h2>
      <div className="flex">
        <StarRating rating={product.averageRating ?? 5} />
        <span className="ml-2">{product.averageRating}/5</span>
      </div>
      <div className="flex pt-5 ">
        <h3 className="text-2xl md:text-[32px] font-bold mr-2">
          {displayPrice}
        </h3>
        {oldPrice && (
          <h3 className="line-through text-gray-400 md:text-[32px] font-bold mr-2 text-2xl">
            {oldPrice}
          </h3>
        )}
        {discountPercent && (
          <span className="bg-red-100 text-red-500 text-md rounded-4xl w-20 flex justify-center items-center px-2">
            {discountPercent}
          </span>
        )}
      </div>
      <div className="text-gray-400 text-md pt-5">{parse(product.shortDescription || '')}</div>
      <hr className="my-4 w-full  mx-auto border-t border-gray-300" />
      <div className="md:items-end mx-auto">

        {/* Color Picker */}
        <p className="text-md text-gray-400">Select Colors</p>
        <div className="flex gap-3 mt-3">
          {Object.keys(colorMap).map((color) => {
            const isSelected = color === selectedColor;
            const isLight = isLightColor(color.toLowerCase());

            return (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
                className="w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center relative transition"
                style={{ backgroundColor: color.toLowerCase() }}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>


        <hr className="my-4 w-full mx-auto border-t border-gray-300" />
        {/* Size Picker */}
        {selectedColor && (
          <div className="py-5">
            <p className="text-md text-gray-400">Choose Size</p>
            <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-hide">
              {colorMap[selectedColor].reverse().map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 cursor-pointer md:h-[50px] py-2 rounded-full border text-sm ${selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-[#f0f0f0] text-gray-500 border-gray-300'
                    } hover:border-black`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <hr className="my-4 w-full  mx-auto border-t border-gray-300" />
        <div className="flex pt-5 gap-3">
          <QuantityPicker
            min={1}
            max={10}
            className="w-1/3 md:h-[50px] rounded-3xl h-10"
          />
          <Button className="w-3/5 rounded-3xl h-10 md:h-[50px] cursor-pointer flex-end">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
