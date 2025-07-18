import { ProductTypeBySlugQuery } from '@/types/product';
import ProductImage from './ProductImage';
import ProductDetailVariant from './ProductVariant/ProductVariant';

export default function ProductDetail({
  product,
}: {
  product: ProductTypeBySlugQuery;
}) {
  return (
    <>
      <div className="md:px-25 px-5 w-full pb-5 md:px-auto md:justify-between md:flex rounded-2xl">
        <ProductImage product={product as ProductTypeBySlugQuery} />
        <ProductDetailVariant product={product} />
      </div>
    </>
  );
}
