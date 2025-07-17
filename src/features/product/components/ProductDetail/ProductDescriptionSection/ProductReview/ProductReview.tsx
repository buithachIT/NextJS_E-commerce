import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import RatingCardSkeleton from '@/components/skeletons/ratingSkeleton';
import ProductRating from '@/features/rating/components/productRating/PoductRating';
import FilterTrigger from '../FilterPanel/FilterTrigger';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import ProductReviewForm from './ProductReviewForm';
import { ReviewNode } from '@/types/review';
import {
  createReviewByProduct,
  getReviewsByProduct,
} from '@/lib/action/review';
import { Product } from '@/types/product';
import toast from 'react-hot-toast';

export type ReviewFormData = {
  productId: number;
  authorName: string;
  content: string;
  rating: number;
};

export default function ProductReviewSection(props: {
  slug: string;
  product: Product;
}) {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReview] = useState<ReviewNode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { reset } = useForm<ReviewFormData>({
    defaultValues: { productId: 0, authorName: '', content: '', rating: 5 },
  });

  useEffect(() => {
    const fetchReview = async () => {
      const reviews = await getReviewsByProduct(props.slug);
      setReview(reviews as ReviewNode[]);
    };
    fetchReview();
  }, [props.slug]);

  const onSubmit = async (data: ReviewFormData) => {
    setIsLoading(true);
    try {
      await createReviewByProduct(data);
      setShowForm(false);
      reset();
      toast.success('Thanks for your comment!');
    } catch {
      toast.error('Opps, some error!');
    }
  };

  const onCancel = () => {
    setShowForm(false);
  };
  const handleFilterChange = (filter: string) => {
    console.log(filter);
  };

  return (
    <>
      <div className="px-5 md:px-25 md:pt-5">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-md">All Reviews</h2>
            <div className="flex md:gap-4 w-2/3 justify-end items-center gap-2  py-1 rounded-full">
              <FilterTrigger onFilterChange={handleFilterChange} />
              <Select
                defaultValue={'latest'}
                onValueChange={(value) => {
                  const newSearch = new URLSearchParams(window.location.search);
                  newSearch.set('filter', value);
                  window.location.search = `?${newSearch.toString()}`;
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
              <Button
                className="px-4 md:h-[50px] cursor-pointer py-2 rounded-full text-sm"
                onClick={() => setShowForm((s) => !s)}
                disabled={isLoading}
              >
                Write a Review
              </Button>
            </div>
          </div>
          <div
            className={`transition-all duration-300 origin-top ${showForm ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none h-0'}`}
          >
            {showForm && (
              <ProductReviewForm
                onCancel={onCancel}
                onSubmit={onSubmit}
                product={props.product}
              />
            )}
          </div>
          <div>
            <Suspense fallback={<RatingCardSkeleton />}>
              <ProductRating reviews={reviews as ReviewNode[]} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
