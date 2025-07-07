'use client';

import { useState } from 'react';
import FilterPanel from './ProductRatingFilterPanel';
import { AdjustmentsHorizontalIcon } from '@/components/ui/icons';

interface FilterTriggerProps {
  onFilterChange: (filter: string) => void;
}

const FilterTrigger: React.FC<FilterTriggerProps> = ({ onFilterChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="hover:scale-105 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-500"
      >
        <AdjustmentsHorizontalIcon className="w-6 h-6" />
      </button>
      <FilterPanel
        visible={show}
        onClose={() => setShow(false)}
        onFilterSelect={(val) => {
          onFilterChange(val);
          setShow(false);
        }}
      />
    </div>
  );
};

export default FilterTrigger;
