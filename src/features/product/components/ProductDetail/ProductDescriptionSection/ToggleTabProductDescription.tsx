'use client';
import { useState } from 'react';
// import ProductDetailsSection from "./ProductDetailsSection";
import ProductReviewSection from './ProductReview';
import { CUSTOMER_REVIEWS } from '@/types/rating';
import ProductDetailsSection from './ProductDescription';
import { Product } from '@/types/product';
// import ProductFAQSection from "./ProductFAQSection";

export default function ProductTabs({
  reviews,
  product,
}: {
  reviews: CUSTOMER_REVIEWS[];
  product: Product;
}) {
  const [tab, setTab] = useState<'details' | 'reviews' | 'faqs'>('reviews');

  return (
    <div>
      <div className="flex md:px-25 px-5 gap-8 text-[16px] text-gray-500 md:justify-between md:w-full mb-6">
        <div className="md:px-0 w-full flex justify-between border-b">
          <button
            className={`py-3 md:w-full hover:text-gray-400 border-b ${tab === 'details' ? 'border-black text-black font-bold' : 'border-transparent'}`}
            onClick={() => setTab('details')}
          >
            Product Details
          </button>
          <button
            className={`py-3 md:w-full hover:text-gray-400 border-b-2 ${tab === 'reviews' ? 'border-black text-black font-bold' : 'border-transparent'}`}
            onClick={() => setTab('reviews')}
          >
            Rating & Reviews
          </button>
          <button
            className={`py-3 md:w-full hover:text-gray-400 border-b-2 ${tab === 'faqs' ? 'border-black text-black font-bold' : 'border-transparent'}`}
            onClick={() => setTab('faqs')}
          >
            FAQs
          </button>
        </div>
      </div>
      <div>
        {tab === 'details' && <ProductDetailsSection product={product} />}
        {tab === 'reviews' && <ProductReviewSection reviews={reviews} />}
        {/* {tab === "faqs" && <ProductFAQSection product={product} />} */}
      </div>
    </div>
  );
}
