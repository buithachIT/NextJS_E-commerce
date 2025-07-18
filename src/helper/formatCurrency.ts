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

export function extractPriceInfo(
  price: string | null | undefined,
  regularPrice: string | null | undefined
): {
  salePrice: string | null;
  oldPrice: string | null;
  discountPercentage: string | null;
} {
  const normalize = (value: string | null | undefined): number[] => {
    if (!value) return [];

    const plainText = value.replace(/&nbsp;/g, ' ').replace(/[^\d.-]/g, ' ');
    return plainText
      .split(/\s+/)
      .filter(Boolean)
      .map((p) => parseFloat(p))
      .filter((n) => !isNaN(n));
  };

  const priceNumbers = normalize(price);
  const regularNumbers = normalize(regularPrice);

  const sale = priceNumbers.length > 0 ? priceNumbers[0] : null;
  const regular = regularNumbers.length > 0 ? regularNumbers[0] : null;

  const discountPercentage =
    regular !== null && sale !== null && sale < regular
      ? `${Math.round(((regular - sale) / regular) * 100)}%`
      : null;
  if (sale == regular) {
    return {
      salePrice: sale?.toString() ?? null,
      oldPrice: null,
      discountPercentage,
    };
  }
  return {
    salePrice: sale?.toString() ?? null,
    oldPrice: regular?.toString() ?? null,
    discountPercentage,
  };
}
