import { VariableProduct, ProductAttribute } from '@/__generated__/types';
import { FilterValues } from '@/features/product/components/FilterProduct/FilterProduct';
import { ProductCategoryListType } from '@/types/product';

export function filterProducts(
  products: ProductCategoryListType[],
  filters: FilterValues
) {
  return products.filter((product) => {
    if (
      product.__typename !== 'SimpleProduct' &&
      product.__typename !== 'VariableProduct'
    ) {
      return false;
    }

    let attrs: ProductAttribute[] = [];
    if (product.__typename === 'VariableProduct') {
      const variableProduct = product as VariableProduct;
      if (
        variableProduct.attributes &&
        Array.isArray(variableProduct.attributes.nodes)
      ) {
        attrs = variableProduct.attributes.nodes as ProductAttribute[];
      }
    }
    const price = parseFloat(product.price ?? '0');
    const [minPrice, maxPrice] = filters.price;

    const colorMatch =
      Array.isArray(filters.color) && filters.color.length > 0
        ? attrs.some(
            (attr: ProductAttribute) =>
              attr &&
              (attr.name?.toLowerCase() === 'color' ||
                attr.name?.toLowerCase() === 'pa_color') &&
              Array.isArray(attr.options) &&
              attr.options.some((opt) =>
                filters
                  .color!.map((c) => c.toLowerCase())
                  .includes(opt || ''.toLowerCase())
              )
          )
        : true;

    const sizeMatch =
      Array.isArray(filters.size) && filters.size.length > 0
        ? attrs.some(
            (attr: ProductAttribute) =>
              attr &&
              (attr.name?.toLowerCase() === 'size' ||
                attr.name?.toLowerCase() === 'pa_size') &&
              Array.isArray(attr.options) &&
              attr.options.some((opt) =>
                filters
                  .size!.map((s) => s.toLowerCase())
                  .includes(opt || ''.toLowerCase())
              )
          )
        : true;

    return colorMatch && sizeMatch && price >= minPrice && price <= maxPrice;
  });
}
