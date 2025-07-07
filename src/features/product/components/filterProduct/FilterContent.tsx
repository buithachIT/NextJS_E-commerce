'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { isLightColor } from '@/helper/islight';
import { FilterValues } from './FilterProduct';

const colors = [
  '#00C853',
  '#FF1744',
  '#FFD600',
  '#FF9100',
  '#2979FF',
  '#651FFF',
  '#F500A3',
  '#F5F5F5',
  '#000000',
];

const sizes = [
  'XX-Small',
  'X-Small',
  'Small',
  'Medium',
  'Large',
  'X-Large',
  'XX-Large',
  '3X-Large',
  '4X-Large',
];

export default function FilterContent({
  values,
  onChange,
}: {
  values: FilterValues;
  onChange: (val: FilterValues) => void;
}) {
  const [priceRange, setPriceRange] = useState<[number, number]>(
    values.price ?? [50, 300]
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    values.color ?? null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    values.size ?? null
  );
  const [colorIndex, setColorIndex] = useState<number | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Price: true,
    Colors: true,
    Size: true,
    'Dress Style': true,
  });

  useEffect(() => {
    setPriceRange(values.price ?? [50, 300]);
    setSelectedColor(values.color ?? null);
    setSelectedSize(values.size ?? null);
  }, [values]);

  useEffect(() => {
    onChange({
      price: priceRange,
      color: selectedColor ?? undefined,
      size: selectedSize ?? undefined,
    });
  }, [priceRange, selectedColor, selectedSize]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pb-18 md:pb-5">
      {' '}
      {/* button fixed */}
      {/* Categories */}
      <div className="space-y-1 mb-4">
        {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((cat) => (
          <div
            key={cat}
            className="flex text-[#666666] justify-between py-2 cursor-pointer hover:underline"
          >
            <span>{cat}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        ))}
      </div>
      {/* Price */}
      <div className="border-t pt-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('Price')}
        >
          <h3 className="font-bold text-[20px]">Price</h3>
          {openSections.Price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.Price && (
          <div className="mt-4 mb-10">
            <DualRangeSlider
              min={0}
              max={500}
              step={1}
              value={priceRange}
              onValueChange={(val) => setPriceRange([val[0], val[1]])}
              label={(v) => `$${v}`}
              labelPosition="bottom"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      {/* Colors */}
      <div className="border-t pt-4 mb-8">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('Colors')}
        >
          <h3 className="font-bold text-[20px]">Colors</h3>
          {openSections.Colors ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.Colors && (
          <div className="flex flex-wrap gap-2 mt-4">
            {colors.map((color, idx) => {
              const isLight = isLightColor(color);
              return (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setColorIndex(idx);
                  }}
                  className="w-10 h-10 cursor-pointer rounded-full border"
                  style={{ backgroundColor: color }}
                >
                  {idx === colorIndex && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 mx-auto ${isLight ? 'text-black' : 'text-white'}`}
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
        )}
      </div>
      {/* Sizes */}
      <div className="border-t pb-5 pt-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('Size')}
        >
          <h3 className="font-bold text-[20px]">Size</h3>
          {openSections.Size ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.Size && (
          <div className="flex flex-wrap gap-2 mt-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-full cursor-pointer border text-[#666666] text-sm ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Dress Style */}
      <div className="border-t pt-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('Dress Style')}
        >
          <h3 className="font-bold text-[20px]">Dress Style</h3>
          {openSections['Dress Style'] ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections['Dress Style'] && (
          <div className="mt-4 space-y-2">
            {['Casual', 'Formal', 'Party', 'Gym'].map((style) => (
              <div
                key={style}
                className="cursor-pointer text-[#666666] hover:underline"
              >
                {style}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
