/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Product, Variant } from '@/types/product';
import StarRating from '@/components/starRating';
import { Button } from '@/components/ui/button';
import { QuantityPicker } from '@/components/ui/customQuantityPicker';
import { isLightColor } from '@/helper/islight';
export default function ProductDetailVariant({
  product,
}: {
  product: Product;
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const variant = product.variants[variantIndex];
  return (
    <div className="md:flex-col md:pl-5 md:w-1/2 md:justify-between md:h-[520px]">
      <h2 className="md:text-[40px] text-2xl md:pt-0 pt-5 font-display pb-5 font-bold">
        {product.name}
      </h2>
      <div className="flex">
        <StarRating rating={product.rating} />
        <span className="ml-2">{product.rating}/5</span>
      </div>
      <div className="flex pt-5 ">
        <h3 className="text-2xl md:text-[32px] font-bold mr-2">
          ${product.price}
        </h3>
        {product.oldPrice && (
          <h3 className="line-through text-gray-400 md:text-[32px] font-bold mr-2 text-2xl">
            ${product.oldPrice}
          </h3>
        )}
        {product.discount && (
          <span className="bg-red-100 text-red-500 text-sm rounded-4xl w-20 flex justify-center items-center px-2">
            {product.discount}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm pt-5">{product.description}</p>
      <hr className="my-4 w-full  mx-auto border-t border-gray-300" />
      <div className="md:items-end mx-auto">
        {/* Color Picker */}
        <p className="text-sm text-gray-400">Select Colors</p>
        <div className="flex gap-3 mt-3">
          {product.variants.map((v: Variant, idx: number) => {
            const isSelected = idx === variantIndex;
            const isLight = isLightColor(v.colorCode);

            return (
              <button
                key={v.colorCode}
                onClick={() => {
                  setVariantIndex(idx);
                  setSelectedSize(null);
                }}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center relative transition`}
                style={{ backgroundColor: v.colorCode }}
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
              </button>
            );
          })}
        </div>

        <hr className="my-4 w-full mx-auto border-t border-gray-300" />
        {/* Size Picker */}
        <div className="py-5">
          <p className="text-sm text-gray-400">Choose Size</p>
          <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-hide">
            {variant.sizes.map((s: any) => (
              <button
                key={s.label}
                disabled={s.stock === 0}
                onClick={() => setSelectedSize(s.label)}
                className={`px-4 md:h-[50px] py-2 rounded-full border text-sm ${
                  selectedSize === s.label
                    ? 'bg-black text-white border-black'
                    : 'bg-[#f0f0f0] text-gray-500 border-gray-300'
                } ${s.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-black'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
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
