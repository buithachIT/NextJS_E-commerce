"use client";


import { useGetCountriesQuery } from "@/__generated__/types";
import client from "@/lib/apollo/apollo-client";


export default function CountriesPage() {
    const { data, loading, error } = useGetCountriesQuery({ client });

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi: {error.message}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Danh sách quốc gia</h1>
            <ul className="grid grid-cols-2 gap-2">
                {data?.countries.map((country) => (
                    <li key={country.code} className="border p-2 rounded">
                        <span className="text-xl">{country.emoji}</span> {country.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
