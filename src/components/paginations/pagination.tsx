'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  onPageChange,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const getLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${basePath}?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else if (basePath) {
      const target = getLink(page);
      startTransition(() => {
        router.push(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const createPageArray = (): (number | '...')[] => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 3)
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const pages = createPageArray();

  return (
    <div className="flex justify-between mt-8 gap-2 items-center flex-wrap">
      {/* Previous */}
      <div>
        {currentPage > 1 && (
          <Button
            onClick={() => goToPage(currentPage - 1)}
            variant={'outline'}
            disabled={isPending}
            className="px-3 py-2 border rounded-lg hover:bg-gray-100 flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Previous
          </Button>
        )}
      </div>

      {/* Page Numbers */}
      <div>
        {pages.map((page, idx) =>
          page === '...' ? (
            <Button
              key={`ellipsis-${idx}`}
              variant={'outline'}
              disabled
              className="px-3 mr-1 py-2 border-0 text-gray-400 cursor-default"
            >
              ...
            </Button>
          ) : (
            <Button
              key={page}
              onClick={() => goToPage(page)}
              variant={'outline'}
              disabled={isPending}
              className={`px-3 mr-1 py-2 border-0 text-gray-500 ${
                page === currentPage
                  ? 'bg-gray-100 text-black'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </Button>
          )
        )}
      </div>

      {/* Next */}
      <div>
        {currentPage < totalPages && (
          <Button
            onClick={() => goToPage(currentPage + 1)}
            variant={'outline'}
            disabled={isPending}
            className="px-3 py-2 border rounded-lg hover:bg-gray-100 flex items-center gap-1"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
