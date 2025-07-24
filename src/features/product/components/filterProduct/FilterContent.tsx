'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { isLightColor } from '@/helper/islight';
import { FilterValues } from './FilterProduct';
import { getSizeColor } from '@/lib/action/product';
import { getCategory } from '@/lib/action/category';
import { CategoryNode } from '@/types/category';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

type ColorNode = { name?: string | null; slug?: string | null };
type SizeNode = { name?: string | null; slug?: string | null };

const DEFAULT_COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'black',
  'white',
  'purple',
  'orange',
];
const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function FilterContent({
  values,
  onChange,
}: {
  values: FilterValues;
  onChange: (val: FilterValues) => void;
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Price: true,
    Colors: true,
    Size: true,
    'Dress Style': true,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);
  const [sizes, setSizes] = useState<string[]>(DEFAULT_SIZES);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  useEffect(() => {
    const fetchSizeColor = async () => {
      try {
        const result = await getSizeColor();

        const fetchedColors =
          result?.colors?.map((c: ColorNode) => c.name ?? '').filter(Boolean) ??
          [];
        const fetchedSizes =
          result?.sizes?.map((s: SizeNode) => s.name ?? '').filter(Boolean) ??
          [];

        setColors(fetchedColors.length > 0 ? fetchedColors : DEFAULT_COLORS);
        setSizes(fetchedSizes.length > 0 ? fetchedSizes : DEFAULT_SIZES);
      } catch (error: unknown) {
        let message = 'Unknown error';

        if (error instanceof Error) {
          message = error.message;
        }

        console.error('Error fetching product options:', message);
        setColors(DEFAULT_COLORS);
        setSizes(DEFAULT_SIZES);
      }
    };
    fetchSizeColor();
  }, []);

  useEffect(() => {
    const fetchStyle = async () => {
      const data = await getCategory();
      if (data) {
        const data = await getCategory();
        setCategories(data ?? []);
      }
    };
    fetchStyle();
  }, []);

  function toggleArrayValue<T>(value: T, array: T[]) {
    return array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];
  }

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSectionHeader = (label: string) => (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => toggleSection(label)}
    >
      <h3 className="font-bold text-[20px]">{label}</h3>
      {openSections[label] ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
    </div>
  );

  const handleColorChange = (color: string) => {
    const next = toggleArrayValue(color, values.color ?? []);
    onChange({
      ...values,
      color: next.length > 0 ? next : undefined,
    });
  };

  const handleSizeChange = (size: string) => {
    const next = toggleArrayValue(size, values.size ?? []);
    onChange({
      ...values,
      size: next.length > 0 ? next : undefined,
    });
  };

  const handlePriceChange = (val: [number, number]) => {
    onChange({
      ...values,
      price: val,
    });
  };
  const handleCategoryChange = (newCategorySlug: string) => {
    const newPath = `/category/${newCategorySlug}`;
    const currentParams = searchParams.toString();

    router.replace(`${newPath}?${currentParams}`);
  };
  return (
    <div className="pb-18 md:pb-5">
      <div className="space-y-1 mb-4">
        {categories.map((cat: CategoryNode) => {
          if (cat.display === 'SUBCATEGORIES')
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug ?? '')}
                className="flex text-[#666666] justify-between py-2 cursor-pointer hover:underline"
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            );
        })}
      </div>

      <div className="border-t pt-4">
        {renderSectionHeader('Price')}
        {openSections.Price && (
          <div className="mt-4 mb-10">
            <DualRangeSlider
              min={0}
              max={500}
              step={1}
              value={values.price ?? [50, 300]}
              onValueChange={handlePriceChange}
              label={(v) => `$${v}`}
              labelPosition="bottom"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="border-t pt-4 mb-8">
        {renderSectionHeader('Colors')}
        {openSections.Colors && (
          <div className="flex flex-wrap gap-2 mt-4">
            {colors.map((color) => {
              const isLight = isLightColor(color);
              const isSelected = (values.color ?? []).includes(color);
              return (
                <Button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded-full cursor-pointer border flex items-center justify-center`}
                  style={{ backgroundColor: color }}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 ${isLight ? 'text-black' : 'text-white'}`}
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
        )}
      </div>

      <div className="border-t pb-5 pt-4">
        {renderSectionHeader('Size')}
        {openSections.Size && (
          <div className="flex flex-wrap gap-2 mt-4">
            {sizes.map((size) => (
              <Button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-1 rounded-full cursor-pointer border text-sm ${(values.size ?? []).includes(size)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {size}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        {renderSectionHeader('Dress Style')}
        {openSections['Dress Style'] && (
          <div className="mt-4 space-y-2">
            {categories.map((cat) => {
              if (cat.display === 'DEFAULT')
                return (
                  <div
                    key={cat?.id}
                    className="cursor-pointer text-[#666666] hover:underline"
                    onClick={() => handleCategoryChange(cat.slug ?? '')}
                  >
                    {cat.name}
                  </div>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
