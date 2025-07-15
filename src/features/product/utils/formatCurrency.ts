export function formatCurrency(value: string | null | undefined) {
  const number = parseFloat(value ?? '');
  if (isNaN(number)) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

function extractFirstAndLastNumber(
  value: string | null | undefined
): [number | null, number | null] {
  if (!value) return [null, null];

  const plainText = value.replace(/&nbsp;/g, ' ').replace(/[^\d.-]/g, ' ');
  const parts = plainText.split(/\s+/).filter(Boolean);
  const firstNum = parseFloat(parts[0]);
  const lastNum = parseFloat(parts[parts.length - 1]);

  return [isNaN(firstNum) ? null : firstNum, isNaN(lastNum) ? null : lastNum];
}

export const getPriceInfo = (
  price?: string | null,
  _regularPrice?: string | null
) => {
  const [priceNum, regularNum] = extractFirstAndLastNumber(price);

  const hasDiscount =
    priceNum !== null && regularNum !== null && priceNum < regularNum;

  const discountPercent = hasDiscount
    ? `${Math.round(((regularNum - priceNum) / regularNum) * 100)}%`
    : null;

  return {
    displayPrice:
      priceNum !== null ? formatCurrency(priceNum.toString()) : null,
    oldPrice:
      hasDiscount && regularNum !== null
        ? formatCurrency(regularNum.toString())
        : null,
    discountPercent,
  };
};
