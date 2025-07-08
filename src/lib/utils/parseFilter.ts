import { FilterValues } from '@/features/product/components/FilterProduct/FilterProduct';

export function parseFilter(queryStr: string): FilterValues {
  try {
    const parsed = JSON.parse(queryStr);
    return {
      price: parsed?.price ?? [0, 999],
      color: parsed?.color,
      size: parsed?.size,
      style: parsed?.style,
    };
  } catch (e) {
    console.error('Invalid filter query:', e);
    return { price: [0, 999] };
  }
}
