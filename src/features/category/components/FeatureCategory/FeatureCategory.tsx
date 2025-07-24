import ProductList from '@/features/product/components/FeatureProduct/ProductList';
import FilterToggle from '@/features/product/components/FilterProduct/FilterProduct';
import { parseFilter } from '@/features/product/utils/parseFilter';
import { getProductByCategory } from '@/lib/action/product';
import { ProductCategoryListType } from '@/types/product';
import { DEFAULT_PAGE_SIZE } from '@/consts/pagination';
import Pagination from '@/components/paginations/pagination';
import { ROUTES } from '@/config/routes';
import { SortSelect } from '@/features/product/components/FilterProduct/sortProduct';
import { filterProducts } from '@/features/product/utils/filterProduct';
import { sortProducts } from '@/features/product/utils/sortProduct';

type Props = {
  params: { slug: string };
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
  };
};

export default async function FeatureCategory({ params, searchParams }: Props) {
  const productList = await getProductByCategory(params.slug);
  const rawQuery = searchParams?.query ?? '{}';
  const filters = parseFilter(rawQuery);

  const filteredProducts = filterProducts(
    productList as ProductCategoryListType[],
    filters
  );
  const sort = searchParams?.sort || 'popular';
  const sortedProducts = sortProducts(filteredProducts, sort);

  const currentPage = parseInt(searchParams?.page || '1');

  const start = (currentPage - 1) * DEFAULT_PAGE_SIZE;
  const end = start + DEFAULT_PAGE_SIZE;

  const paginatedProducts = sortedProducts.slice(start, end);
  const totalPages = Math.ceil(sortedProducts.length / DEFAULT_PAGE_SIZE);

  return (
    <div className="md:flex gap-6">
      <div className="hidden md:block">
        <FilterToggle filterValues={filters} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-end">
          <h2 className="md:text-3xl text-2xl font-bold capitalize">
            {params.slug.replace(/-/g, ' ')}
          </h2>

          <div className="flex items-end justify-between">
            <span className="pb-1 text-[#666666] text-sm mr-4">
              <p className="text-[#666666] text-sm mr-4">
                Showing {sortedProducts.length === 0 ? 0 : start + 1}-
                {Math.min(end, sortedProducts.length)} of{' '}
                {sortedProducts.length} products
              </p>
            </span>

            <span className="relative cursor-pointer md:hidden h-10 w-10 rounded-full ml-3 bg-gray-100 flex items-center justify-center">
              <FilterToggle filterValues={filters} />
            </span>

            <span className="md:flex self-end pt-1 hidden text-[#666666] text-sm">
              <p className="self-center pt-2">Sort by:</p>
              <div className="text-black cursor-pointer">
                <SortSelect />
              </div>
            </span>
          </div>
        </div>

        <ProductList
          products={paginatedProducts}
          className="grid-cols-2 md:grid-cols-3"
        />

        <hr className="my-4 border-t border-gray-200" />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={ROUTES.PRODUCT_CATEGORY(params.slug)}
        />
      </div>
    </div>
  );
}
