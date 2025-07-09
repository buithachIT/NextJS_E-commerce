import { Product } from '@/types/product';
import parse from 'html-react-parser'
export default function ProductDetailsSection({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="space-y-4 py-5 px-5 md:px-25">
      <h2 className="font-bold text-lg">Product Details</h2>
      <div>{parse(product.description || '')}</div>
    </div>
  );
}
