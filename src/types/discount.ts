export type DiscountType = 'percent' | 'fixed';

export interface PromoCode {
  code: string;
  type: DiscountType;
  value: number;
}
