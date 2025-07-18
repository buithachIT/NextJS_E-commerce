import StarRating from '@/components/starRating';
import { hasPrice } from '@/helper/isTypeProduct';
import { ProductTypeBySlugQuery } from '@/types/product';
import ProductVariantDetail from './ProductVariantDetail';

export default function ProductVariant({
  product,
}: {
  product: ProductTypeBySlugQuery;
}) {
  if (!hasPrice(product)) return null;

  return (
    <div className="md:flex-col md:pl-5 md:w-1/2 md:justify-between">
      <h2 className="md:text-[40px] text-2xl md:pt-0 pt-5 font-display pb-5 font-bold">
        {product.name}
      </h2>
      <div className="flex">
        <StarRating rating={product.averageRating ?? 5} />
        <span className="ml-2">{product.averageRating}/5</span>
      </div>
      <ProductVariantDetail product={product} />
    </div>
  );
}
