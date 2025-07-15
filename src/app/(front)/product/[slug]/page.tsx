import Breadcrumb from '@/components/breadcrumb';
import ProductFeatureByType from '@/features/product/components/FeatureProduct/ProductFeatureByType';
import ProductTabs from '@/features/product/components/ProductDetail/ProductDescriptionSection/ToggleTabProductDescription';
import ProductDetail from '@/features/product/components/ProductDetail/ProductDetail';
import { getProductBySlug } from '@/lib/action/product';
import { getRatingByProductId } from '@/lib/action/rating';
import { Product } from '@/types/product';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = await getProductBySlug((await params).slug);

  const { data: reviews } = await getRatingByProductId((await params).slug);
  return (
    <>
      <Breadcrumb />
      <ProductDetail product={product as Product} />
      <ProductTabs reviews={reviews} product={product as Product} />
      <ProductFeatureByType
        title="YOU MIGHT ALSO LIKE"
        type="bestseller"
        className="hide-btn"
      />
    </>
  );
}
