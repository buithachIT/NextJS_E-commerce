import { Product } from '@/types/product';

export default function ProductDetailsSection({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="space-y-4 py-5 px-5 md:px-25">
      <h2 className="font-bold text-lg">Product Details</h2>
      <p>{product.description}</p>
      <div>
        <span className="font-semibold">Material:</span> {product.description}
      </div>
      <div>
        <span className="font-semibold">Care Instructions:</span>{' '}
        {product.description}
      </div>
    </div>
  );
}
