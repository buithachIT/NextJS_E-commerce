import ProductCard from "@/features/product/components/productCard";
import { getBestSellerProducts, getNewProducts } from "@/lib/action/product";
import { Product } from "@/types/product";

type Props = {
    type: 'new' | 'bestseller';
    title: string;
};

export default async function ProductFeatureList({ type }: Props) {
    const { data: products } =
        type === 'bestseller'
            ? await getBestSellerProducts()
            : await getNewProducts();
    return (
        <div className="flex gap-4 overflow-x-auto overflow-y-visible px-6 scrollbar-hide pb-4">
            {products.map((product: Product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>

    );
}
