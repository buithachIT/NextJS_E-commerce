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
// Get products by category
export const getProductsByCategory = cache(async (categoryId: string, page = 1, pageSize = 6, limit = 9) => {
  await sleep(2000);

  try {
    const res = await fetch(
      apiPath(`/v1/product?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&limit=${limit}`)
    );
    const json = await res.json();
    return { data: json.data, meta: json.meta };
  } catch (err) {
    return { data: { products: [], total: 0 } };
  }
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
