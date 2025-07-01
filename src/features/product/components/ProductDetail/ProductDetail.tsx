import { Product } from "@/types/product"
import ProductImage from "./ProductImage"
import ProductDetailVariant from "./ProductVariant"
export default async function ProductDetail({ product }: { product: Product }) {
    return (
        <>
            <div className="px-5 md:gap-10 md:px-25 pb-5 md:px-auto md:justify-between md:flex rounded-2xl md:h-[600px]">
                <ProductImage product={product} />
                <ProductDetailVariant product={product} />
            </div>
        </>
    )
}