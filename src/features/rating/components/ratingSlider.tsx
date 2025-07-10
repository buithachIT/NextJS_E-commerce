'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, type ReactNode } from 'react';

export default function RatingSlider({ children }: { children: ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="mb-5 flex md:mx-20 justify-between">
        <h3 className="md:text-5xl text-3xl font-bold font-display">
          OUR HAPPY CUSTOMERS
        </h3>
        <div className="flex items-end gap-3">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        >
          {children}
        </div>
        <div className="md:absolute inset-y-0 md:left-0 md:w-40 bg-gradient-to-r md:from-background to-transparent pointer-events-none" />
        <div className="md:absolute inset-y-0 md:right-0  md:w-40 bg-gradient-to-l md:from-background to-transparent pointer-events-none" />
      </div>
    </>
  );
}
