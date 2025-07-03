import Breadcrumb from "@/components/breadcrumb";
import ProductFeatureByType from "@/features/product/components/FeatureProduct/ProductFeatureByType";
import ProductTabs from "@/features/product/components/ProductDetail/ProductDescriptionSection/ToggleTabProductDescription";
import ProductDetail from "@/features/product/components/ProductDetail/ProductDetail";
import { getProductById } from "@/lib/action/product";
import { getRatingByProductId } from "@/lib/action/rating";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const product = await getProductById((await params).id);
    const { data: reviews } = await getRatingByProductId((await params).id);
    return (
        <>
            <Breadcrumb />
            <ProductDetail product={product} />
            <ProductTabs reviews={reviews} product={product} />
            <ProductFeatureByType title="YOU MIGHT ALSO LIKE" type="bestseller" className="hide-btn" />
        </>
    )
}
