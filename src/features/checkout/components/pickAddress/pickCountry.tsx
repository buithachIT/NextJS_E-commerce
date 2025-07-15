'use client';

import ComboboxSelect from '@/components/comboboxSelect/comboboxSelect';
import { Label } from '@/components/ui/label';
import { countries } from '@/consts/country';

type PickCountryProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function PickCountry({ value, onChange }: PickCountryProps) {
  return (
    <div className="pb-2 w-full">
      <Label className="pb-2 text-[20px]">Enter your country: </Label>
      <ComboboxSelect
        label="Country"
        options={countries}
        value={value}
        onChange={onChange}
        placeholder="Choose country"
      />
    </div>
  );
}
