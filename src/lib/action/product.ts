import { cache } from "react";
import { apiPath } from "../api/utils";

async function fetchProductList(sortBy: string, limit: number) {
  try {
    const res = await fetch(
      apiPath(`/v1/product/search?sortBy=${sortBy}&orderBy=desc`)
    );
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    const json = await res.json();
    return { data: json.data.slice(0, limit) };
  } catch (err) {
    console.error(`fetchProductList (${sortBy}) error:`, err);
    return { data: [] };
  }
}

export const getBestSellerProducts = cache(() => fetchProductList('sold', 4));
export const getNewProducts = cache(() => fetchProductList('createdAt', 4));
export const getProductById = async (id: string) => {
  const res = await fetch(apiPath(`/v1/product/${id}`), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch product');

  const json = await res.json();
  return json.data;
};