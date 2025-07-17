import { Product } from '@/types/product';
import parse from 'html-react-parser';
export default function ProductDetailsSection({
  product,
}: {
  product: Product;
}) {
  function renderDescription() {
    if (product.__typename === 'SimpleProduct') {
      return <div>{parse(product.description || '')}</div>;
    }
  }
  return (
    <div className="space-y-4 py-5 px-5 md:px-25">
      <h2 className="font-bold text-lg">Product Details</h2>
      {renderDescription}
    </div>
  );
}
