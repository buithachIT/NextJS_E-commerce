import ProductImage from './ProductImage';
import ProductDetailVariant from './ProductVariant';
import { Product } from '@/types/product';

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <>
      <div className="md:px-25 px-5 w-full pb-5 md:px-auto md:justify-between md:flex rounded-2xl">
        <ProductImage product={product} />
        <ProductDetailVariant product={product} />
      </div>
    </>
  );
}
