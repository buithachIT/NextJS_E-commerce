import Breadcrumb from '@/components/breadcrumb';
import SkeletonCategoryPage from '@/components/skeletons/categoryPageSkeleton';
import FeatureCategory from '@/features/category/components/FeatureCategory/FeatureCategory';
import { Suspense } from 'react';

const CategoryPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { query?: string; page?: string };
}) => {
  const categoryProps = { params, searchParams };
  return (
    <div>
      <Breadcrumb />
      <div className="px-5 md:px-25 pb-10">
        <Suspense fallback={<SkeletonCategoryPage />}>
          <FeatureCategory {...categoryProps} />
        </Suspense>
      </div>
    </div>
  );
};
export default CategoryPage;
