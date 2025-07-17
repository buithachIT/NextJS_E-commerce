'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

type QuantityPickerProps = {
  min?: number;
  max?: number;
  value?: number;
  onChange: (value: number) => void;
  className?: string;
};

export function QuantityPicker({
  min = 1,
  max = 10,
  value = 0,
  onChange,
  className = '',
}: QuantityPickerProps) {
  const [quantity, setQuantity] = useState(min);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (value !== 0) {
      setQuantity(value);
    }
    setIsLoading(false);
  }, [value]);

  const handleChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const decrement = () => {
    if (quantity > min) {
      handleChange(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < max) {
      handleChange(quantity + 1);
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gray-100 px-3 py-1 ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={decrement}
        disabled={quantity <= min}
      >
        –
      </Button>

      <span className="w-6 text-center font-medium">
        {isLoading ? (
          <ClipLoader size={10} aria-label="Loading Spinner" />
        ) : (
          quantity
        )}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={increment}
        disabled={quantity >= max}
      >
        +
      </Button>
    </div>
  );
}
