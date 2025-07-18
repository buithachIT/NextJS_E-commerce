import { SimpleProduct } from '@/__generated__/types';
import { Product } from '@/types/product';
import parse from 'html-react-parser';
export default function ProductDetailsSection({
  product,
}: {
  product: Product;
}) {
  function renderDescription() {
    const simple = product as SimpleProduct;
    return <div>{parse(simple.description || '')}</div>;
  }
  return (
    <div className="space-y-4 py-5 px-5 md:px-25">
      <h2 className="font-bold text-lg">Product Details</h2>
      {renderDescription()}
    </div>
  );
}
