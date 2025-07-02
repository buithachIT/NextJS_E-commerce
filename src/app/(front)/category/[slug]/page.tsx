import Breadcrumb from "@/components/breadcrumb"
import ProductListSkeleton from "@/components/skeletons/productListSekeleton"
import FeatureCategory from "@/features/category/components/FeatureCategory/FeatureCategory"
import { Suspense } from "react"

const CategoryPage = ({ params, searchParams }: { params: { slug: string }, searchParams: { page: string } }) => {
    return (
        <div>
            <Breadcrumb />
            <div className="px-5 md:px-25 pb-10">
                <div className="flex">
                    <div className="w-1/5 hidden md:block">Filter</div>
                    <Suspense fallback={<ProductListSkeleton />}>
                        <FeatureCategory params={params} searchParams={searchParams} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
export default CategoryPage