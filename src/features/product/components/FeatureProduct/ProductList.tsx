import { Product } from "@/types/product";
import ProductCard from "../productCard";

export default function ProductList({ products, className }: { products: Product[], className: string }) {

    return (
        <div className={`grid gap-4 ${className}`}>
            {products.map((product: Product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )
}