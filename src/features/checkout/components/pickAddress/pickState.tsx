import { useGetStatesQuery } from '@/__generated__/types';
import ComboboxSelect from '@/components/comboboxSelect/comboboxSelect';
import { Label } from '@/components/ui/label';
import client from '@/lib/apollo/apollo-client';

type Props = {
  countryCode: string;
  value?: string;
  onChange: (value: string) => void;
};

export default function PickState({ countryCode, value, onChange }: Props) {
  const { data, loading } = useGetStatesQuery({
    variables: { code: countryCode },
    client,
    skip: !countryCode,
  });

  const states =
    data?.country?.states?.map((s) => ({
      label: s.name,
      value: s.code ?? s.name,
    })) ?? [];

  return (
    <div className="pb-2 w-full">
      <Label className="pb-2">Choose your state</Label>
      <ComboboxSelect
        label="State"
        options={states}
        value={value}
        onChange={onChange}
        placeholder="Choose state"
        loading={loading}
      />
    </div>
  );
}
