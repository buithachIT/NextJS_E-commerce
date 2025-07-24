'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SortSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortValue = searchParams.get('sort') || 'popular';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={sortValue} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] border-0">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">Most Popular</SelectItem>
        <SelectItem value="asc">Price: Low to High</SelectItem>
        <SelectItem value="desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
