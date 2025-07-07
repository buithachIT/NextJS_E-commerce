'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

interface FilterPanelProps {
  visible: boolean;
  onClose: () => void;
  onFilterSelect: (option: string) => void;
}

const options = [
  { label: '⭐ 5 Stars', value: '5' },
  { label: '⭐ 4 Stars', value: '4' },
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  visible,
  onClose,
  onFilterSelect,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute top-14 right-0 z-20 w-56">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center px-4 pt-4 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Filter by
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ScrollArea className="max-h-50">
            <div className="space-y-2">
              {options.map((opt) => (
                <Button
                  key={opt.value}
                  variant="ghost"
                  className="justify-start w-full text-left text-sm text-gray-700 hover:text-black"
                  onClick={() => {
                    onFilterSelect(opt.value);
                    onClose();
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPanel;
