'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

type QuantityPickerProps = {
  min?: number;
  max?: number;
  className?: string;
};

export function QuantityPicker({
  min = 1,
  max = 10,
  className = '',
}: QuantityPickerProps) {
  const [quantity, setQuantity] = useState(min);

  const decrement = () => setQuantity((q) => Math.max(min, q - 1));
  const increment = () => setQuantity((q) => Math.min(max, q + 1));

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
      <span className="w-6 text-center font-medium">{quantity}</span>
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
