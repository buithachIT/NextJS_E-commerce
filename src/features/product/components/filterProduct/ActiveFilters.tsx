import React from 'react';
import type { FilterValues } from './FilterProduct';

function ActiveFilters({
  filterValues,
  onRemove,
  onClear,
}: {
  filterValues: FilterValues;
  onRemove: (key: keyof FilterValues, value?: string) => void;
  onClear: () => void;
}) {
  const { price, color, size, style } = filterValues;
  const hasActive =
    (color && color.length > 0) ||
    (size && size.length > 0) ||
    style ||
    (price && (price[0] !== 50 || price[1] !== 300));

  if (!hasActive) return null;
  return (
    <div className="mb-4 flex flex-wrap gap-2 items-center">
      {price && (price[0] !== 50 || price[1] !== 300) && (
        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1">
          Price: ${price[0]} - ${price[1]}
          <button
            onClick={() => onRemove('price')}
            className="ml-1 text-gray-500 hover:text-black"
          >
            ×
          </button>
        </span>
      )}
      {color &&
        color.map((c: string) => (
          <span
            key={c}
            className="px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1"
          >
            <span
              className="w-4 h-4 rounded-full inline-block border"
              style={{ background: c }}
            />
            <span>{c}</span>
            <button
              onClick={() => onRemove('color', c)}
              className="ml-1 text-gray-500 hover:text-black"
            >
              ×
            </button>
          </span>
        ))}
      {size &&
        size.map((s: string) => (
          <span
            key={s}
            className="px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1"
          >
            Size: {s}
            <button
              onClick={() => onRemove('size', s)}
              className="ml-1 text-gray-500 hover:text-black"
            >
              ×
            </button>
          </span>
        ))}
      {style && (
        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1">
          Style: {style}
          <button
            onClick={() => onRemove('style')}
            className="ml-1 text-gray-500 hover:text-black"
          >
            ×
          </button>
        </span>
      )}
      <button
        onClick={onClear}
        className="ml-2 text-xs underline text-gray-500 hover:text-black"
      >
        Clear all
      </button>
    </div>
  );
}

export default ActiveFilters;
