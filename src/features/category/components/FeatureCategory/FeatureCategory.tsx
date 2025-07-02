import Pagination from "@/components/paginations/pagination";
import { AdjustmentsHorizontalIcon } from "@/components/ui/icons";
import ProductList from "@/features/product/components/FeatureProduct/ProductList";
import { getProductsByCategory } from "@/lib/action/product";
import { CATEGORY } from "@/mocks/datas/product";

export default async function FeatureCategory({ params, searchParams }: { params: { slug: string }, searchParams: { page: string } }) {
    const category = CATEGORY.find(c => c.slug === params.slug);

    const currentPage = Number(searchParams.page || '1');
    const pageSize = 9;

    const res = await getProductsByCategory(category?.id || '', currentPage, pageSize)
    const products = res.data;
    const total = res.meta.total

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);
    console.log('check', products.length)
    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-end pb-5">
                <h2 className="md:text-3xl text-2xl font-bold flex self-end">{category?.name}</h2>
                <div className="flex justify-between">
                    <p className="pb-1 text-[#666666] text-sm self-end mr-4">Showing {start}-{end} of {total} products</p>
                    <span className="h-10 w-10 rounded-full ml-3 bg-gray-100 flex items-center justify-center">
                        <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
                    </span>
                </div>
            </div>
            {/* Product list */}
            <ProductList products={products} className="grid-cols-2 md:grid-cols-3" />
            <hr className="my-4 w-full mx-auto border-t border-gray-200" />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(total / pageSize)}
                basePath={`/category/${params.slug}`}
            />
        </div>
    )
}