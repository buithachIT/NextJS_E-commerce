import { SimpleProduct, VariableProduct } from '@/__generated__/types';
import { Product } from '@/types/product';

export function isSimpleProduct(product: Product): product is SimpleProduct {
  return product.__typename === 'SimpleProduct';
}

export function isVariableProduct(
  product: Product
): product is VariableProduct {
  return product.__typename === 'VariableProduct';
}
export function hasPrice(
  product: Product
): product is SimpleProduct | VariableProduct {
  return (
    product.__typename === 'SimpleProduct' ||
    product.__typename === 'VariableProduct'
  );
}
