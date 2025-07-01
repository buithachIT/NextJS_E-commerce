import { Button } from "@/components/ui/button";
import { Suspense } from 'react';
import RatingCardSkeleton from '@/components/skeleton/ratingSkeleton';
import ProductRating from "@/features/rating/components/productRating/PoductRating";
import { CUSTOMER_REVIEWS } from "@/types/rating";
import FilterTrigger from "./FilterPanel/FilterTrigger";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductReviewSection({ reviews }: { reviews: CUSTOMER_REVIEWS[] }) {
    const handleFilterChange = (filter: string) => {
        console.log(filter);
    };

    return (
        <>
            <div className="px-5 md:px-25 md:pt-5">
                {/* Review */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-md">All Reviews</h2>
                        {/* Filter */}
                        <div className="flex md:gap-4 w-2/3 justify-end items-center gap-2  py-1 rounded-full">
                            <FilterTrigger onFilterChange={handleFilterChange} />
                            <Select
                                defaultValue={'latest'}
                                onValueChange={(value) => {
                                    const newSearch = new URLSearchParams(window.location.search)
                                    newSearch.set("filter", value)
                                    window.location.search = `?${newSearch.toString()}`
                                }}
                            >
                                <SelectTrigger className="w-[160px] cursor-pointer text-sm hidden md:flex bg-transparent border-none focus:ring-0 focus:outline-none">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Latest</SelectItem>
                                    <SelectItem value="highest">Highest rating</SelectItem>
                                    <SelectItem value="lowest">Lowest rating</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* Write a Review */}
                            <Button className="px-4 md:h-[50px] cursor-pointer py-2 rounded-full text-sm">
                                Write a Review
                            </Button>
                        </div>
                    </div>
                    {/* Review list*/}
                    <div>
                        <Suspense fallback={<RatingCardSkeleton />}>
                            <ProductRating reviews={reviews} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}