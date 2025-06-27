import { useGetCountriesQuery } from "@/__generated__/types";
import ComboboxSelect from "@/components/comboboxSelect/comboboxSelect";
import { Label } from "@/components/ui/label";
import client from "@/lib/apollo/apollo-client";

type PickCountryProps = {
    value?: string;
    onChange: (value: string) => void;
};

export default function PickCountry({ value, onChange }: PickCountryProps) {
    const { data, loading } = useGetCountriesQuery({ client });

    const countries = data?.countries.map((c) => ({
        label: c.name,
        value: c.code,
    })) ?? [];

    return (
        <div className="pb-2 w-full">
            <Label className="pb-2">Enter your country: </Label>
            <ComboboxSelect
                label="Country"
                options={countries}
                value={value}
                onChange={onChange}
                placeholder="Choose country"
                loading={loading}
            />
        </div>
    );
}
