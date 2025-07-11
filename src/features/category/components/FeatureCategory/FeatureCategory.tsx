import Pagination from '@/components/paginations/pagination';
import { ROUTES } from '@/config/routes';
import { DEFAULT_LIMIT, DEFAULT_PAGE_SIZE } from '@/consts/pagination';
import ProductList from '@/features/product/components/FeatureProduct/ProductList';
import FilterToggle from '@/features/product/components/FilterProduct/FilterProduct';
import { SortSelect } from '@/features/product/components/FilterProduct/sortProduct';
import { getSortParams } from '@/features/product/utils/sortProduct';
import { getProductsByCategory } from '@/lib/action/product';
import { parseFilter } from '@/features/product/utils/parseFilter';
import { CATEGORY } from '@/mocks/datas/product';

export default async function FeatureCategory({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { query?: string; page?: string; sort?: string };
}) {
  const rawQuery = searchParams?.query ?? '{}';
  const currentPage = Number(searchParams?.page) || 1;

  const parsedFilter = parseFilter(rawQuery);

  const category = CATEGORY.find((c) => c.slug === params.slug);
  const sort = searchParams?.sort || 'popular';
  const { sortBy, orderBy } = getSortParams(sort);

  const apiParams = {
    categoryId: category?.id || '1',
    minPrice: Number(parsedFilter.price?.[0]),
    maxPrice: Number(parsedFilter.price?.[1]),
    color: parsedFilter.color?.join(','),
    size: parsedFilter.size?.join(','),
    page: currentPage,
    limit: DEFAULT_LIMIT,
    sortBy: sortBy,
    orderBy: orderBy,
  };
  const pageSize = DEFAULT_PAGE_SIZE;

  const res = await getProductsByCategory(apiParams);

  const products = res.data;
  const total = res.meta.total;
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  return (
    <div className="md:flex gap-6">
      <div className="hidden md:block">
        <FilterToggle filterValues={parsedFilter} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-end">
          <h2 className="md:text-3xl text-2xl font-bold">{category?.name}</h2>
          <div className="flex items-end justify-between">
            <p className="pb-1 text-[#666666] text-sm mr-4">
              Showing {start}-{end} of {total} products
            </p>
            <span className="relative cursor-pointer md:hidden h-10 w-10 rounded-full ml-3 bg-gray-100 flex items-center justify-center">
              <FilterToggle filterValues={parsedFilter} />
            </span>
            <span className="md:flex self-end pt-1 hidden text-[#666666] text-sm">
              <p className="self-center pt-2">Sort by:</p>
              <div className=" text-black cursor-pointer">
                <SortSelect />
              </div>
            </span>
          </div>
        </div>
        <ProductList
          products={products}
          className="grid-cols-2 md:grid-cols-3"
        />
        <hr className="my-4 border-t border-gray-200" />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / pageSize)}
          basePath={ROUTES.PRODUCT_CATEGORY}
        />
      </div>
    </div>
  );
}
