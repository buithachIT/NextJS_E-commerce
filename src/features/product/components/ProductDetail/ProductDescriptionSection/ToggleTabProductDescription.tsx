'use client';
import { useState } from 'react';
import ProductDetailsSection from './ProductDescription';
import { Product } from '@/types/product';
import ProductReviewSection from './ProductReview/ProductReview';
import { AnimatePresence, motion } from 'framer-motion';

export default function ProductTabs({
  product,
  slug,
}: {
  product: Product;
  slug: string;
}) {
  const [tab, setTab] = useState<'details' | 'reviews' | 'faqs'>('reviews');

  return (
    <div className="md:mt-5">
      <div className="flex md:px-25 px-5 gap-8 text-[16px] text-gray-500 md:justify-between md:w-full mb-6">
        <div className="md:px-0 w-full flex justify-between border-b">
          <button
            className={`relative flex justify-center items-center py-3 md:w-full border-b transition-all duration-200 
    ${tab === 'details' ? 'text-black font-bold border-black' : 'text-gray-500 border-transparent hover:text-black'} 
    after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-0 after:h-[2px] 
    after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            onClick={() => setTab('details')}
          >
            Product Details
          </button>
          <button
            className={`relative flex justify-center items-center py-3 md:w-full border-b transition-all duration-200 
    ${tab === 'reviews' ? 'text-black font-bold border-black' : 'text-gray-500 border-transparent hover:text-black'} 
    after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-0 after:h-[2px] 
    after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            onClick={() => setTab('reviews')}
          >
            Rating & Reviews
          </button>
          <button
            className={`relative flex justify-center items-center py-3 md:w-full border-b transition-all duration-200 
    ${tab === 'faqs' ? 'text-black font-bold border-black' : 'text-gray-500 border-transparent hover:text-black'} 
    after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-0 after:h-[2px] 
    after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            onClick={() => setTab('faqs')}
          >
            FAQs
          </button>
        </div>
      </div>
      <div>
        <AnimatePresence mode="wait">
          {tab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetailsSection product={product} />
            </motion.div>
          )}
          {tab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductReviewSection slug={slug} product={product} />
            </motion.div>
          )}
          {/* {tab === 'faqs' && (
            <motion.div
              key="faqs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductFAQSection product={product} />
            </motion.div>
          )} */}
        </AnimatePresence>
      </div>
    </div>
  );
}
