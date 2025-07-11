import Breadcrumb from '@/components/breadcrumb';
import SkeletonCategoryPage from '@/components/skeletons/categoryPageSkeleton';
import FeatureCategory from '@/features/category/components/FeatureCategory/FeatureCategory';
import { Suspense } from 'react';

const CategoryPage = async (props: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ query?: string; page?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <div>
      <Breadcrumb />
      <div className="px-5 md:px-25 pb-10">
        <Suspense fallback={<SkeletonCategoryPage />}>
          <FeatureCategory params={params} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};
export default CategoryPage;
