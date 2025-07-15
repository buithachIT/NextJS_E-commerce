import { Product } from '@/types/product';
import ProductCard from '@/features/product/components/productCard';
import { getBestSellerProducts, getNewProducts } from '@/lib/action/product';

type Props = {
  type: 'new' | 'bestseller';
  title: string;
};

export default async function ProductFeatureList({ type }: Props) {
  const products =
    type === 'bestseller'
      ? await getBestSellerProducts()
      : await getNewProducts();
  return (
    <div className="flex gap-4 overflow-x-auto overflow-y-visible md:px-6 scrollbar-hide pb-4">
      {Array.isArray(products) &&
        products.map((product: Product) => {
          if (product.__typename === 'VariableProduct') {
            return (
              <ProductCard
                className=""
                product={product}
                key={product.id ?? product.slug}
              />
            );
          }
        })}
    </div>
  );
}
