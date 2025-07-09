export function formatCurrency(value: string | null | undefined) {
    const number = parseFloat(value ?? '');
    if (isNaN(number)) return null;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

export const getPriceInfo = (
    price?: string | null,
    regularPrice?: string | null
) => {
    const priceNum = parseFloat(price ?? '');
    const regularNum = parseFloat(regularPrice ?? '');

    const hasDiscount = !isNaN(priceNum) && !isNaN(regularNum) && priceNum < regularNum;
    const discountPercent = hasDiscount
        ? `${Math.round(((regularNum - priceNum) / regularNum) * 100)}%`
        : null;

    return {
        displayPrice: formatCurrency(price),
        oldPrice: hasDiscount ? formatCurrency(regularPrice) : null,
        discountPercent,
    };
};
