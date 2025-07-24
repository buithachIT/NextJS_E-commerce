'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdjustmentsHorizontalIcon } from '@/components/ui/icons';
import { X } from 'lucide-react';
import FilterContent from './FilterContent';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ActiveFilters from './ActiveFilters';

export type FilterValues = {
  categoryId?: string;
  subCategory?: string;
  price: [number, number];
  color?: string[];
  size?: string[];
  style?: string;
};

export default function FilterToggle({
  filterValues,
}: {
  filterValues: FilterValues;
}) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [localFilterValues, setLocalFilterValues] =
    useState<FilterValues>(filterValues);
  const [appliedFilterValues, setAppliedFilterValues] =
    useState<FilterValues>(filterValues);

  useEffect(() => {
    setLocalFilterValues(filterValues);
    setAppliedFilterValues(filterValues);
  }, [filterValues]);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      try {
        const parsed = JSON.parse(query);
        setLocalFilterValues((prev) => ({
          ...prev,
          ...parsed,
        }));
        setAppliedFilterValues((prev) => ({
          ...prev,
          ...parsed,
        }));
      } catch (e) {
        console.error('Invalid query param:', e);
      }
    }
  }, [searchParams]);

  const handleRemoveFilter = (key: keyof FilterValues, value?: string) => {
    setLocalFilterValues((prev) => {
      let next: FilterValues;
      if (key === 'color' || key === 'size') {
        const arr = prev[key] || [];
        const newArr = (arr as string[]).filter((v: string) => v !== value);
        next = { ...prev, [key]: newArr.length > 0 ? newArr : undefined };
      } else if (key === 'price') {
        next = { ...prev, price: [50, 300] };
      } else {
        next = { ...prev, [key]: undefined };
      }

      setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        params.set('query', JSON.stringify(next));
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
      }, 0);
      return next;
    });
  };

  const handleClearAll = () => {
    const cleared: FilterValues = {
      price: [50, 300],
      color: undefined,
      size: undefined,
      style: undefined,
    };

    setLocalFilterValues(cleared);
    setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set('query', JSON.stringify(cleared));
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    }, 0);
  };

  const handleFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('query', JSON.stringify(localFilterValues));
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
    setAppliedFilterValues(localFilterValues);
  }, [localFilterValues, pathname, router, searchParams]);
  return (
    <>
      {/* Mobile Toggle */}
      <button onClick={() => setOpen(true)} className="md:hidden">
        <AdjustmentsHorizontalIcon className="w-5 h-5 text-black" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[315px] p-4 border rounded-xl bg-white">
        <div className="flex justify-between border-b-2 mb-2">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <span className="rounded-full flex justify-center pt-1">
            <AdjustmentsHorizontalIcon className="text-gray-400" />
          </span>
        </div>
        <ActiveFilters
          filterValues={appliedFilterValues}
          onRemove={handleRemoveFilter}
          onClear={handleClearAll}
        />
        <FilterContent
          values={localFilterValues}
          onChange={setLocalFilterValues}
        />
        <Button
          onClick={handleFilter}
          className="w-full mt-4 py-3 cursor-pointer rounded-full"
        >
          Apply Filter
        </Button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed pt-[100px] inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-gray-500 opacity-30"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-50 rounded-3xl w-full max-w-sm bg-white h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant={'outline'}
                className="border-0"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6 text-gray-600" />
              </Button>
            </div>
            <hr className="my-4" />
            <ActiveFilters
              filterValues={appliedFilterValues}
              onRemove={handleRemoveFilter}
              onClear={handleClearAll}
            />
            <FilterContent
              values={localFilterValues}
              onChange={setLocalFilterValues}
            />
            <div className="fixed bottom-0 left-0 right-0 max-w-sm w-full bg-white p-4 border-t">
              <Button
                onClick={handleFilter}
                className="w-full py-3 rounded-full"
              >
                Apply Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
