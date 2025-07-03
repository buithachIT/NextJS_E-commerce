import Breadcrumb from '@/components/breadcrumb';
import SkeletonCategoryPage from '@/components/skeletons/categoryPageSkeleton';
import FeatureCategory from '@/features/category/components/FeatureCategory/FeatureCategory';
import { Suspense } from 'react';

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: { query?: string; page?: string };
}) => {
  const resolvedParams = await params;
  return (
    <div>
      <Breadcrumb />
      <div className="px-5 md:px-25 pb-10">
        <Suspense fallback={<SkeletonCategoryPage />}>
          <FeatureCategory params={resolvedParams} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};
export default CategoryPage;
