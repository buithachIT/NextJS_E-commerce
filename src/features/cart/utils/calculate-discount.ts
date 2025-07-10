import { DiscountType } from '@/types/discount';

export function calculateDiscount(
  subtotal: number,
  value: number,
  type: DiscountType
): number {
  if (type === 'percent') return Math.round((subtotal * value) / 100);
  return value;
}
