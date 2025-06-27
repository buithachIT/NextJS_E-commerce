import { cache } from 'react';
import { apiPath } from '../api/utils';

export const getBestSellerProducts = cache(async (limit = 4) => {
  const res = await fetch(
    apiPath(`/v1/product/search?sortBy=sold&orderBy=desc`)
  );
  const json = await res.json();
  return {
    data: json.data.slice(0, limit),
  };
});

export const getNewProducts = cache(async (limit = 4) => {
  const res = await fetch(
    apiPath(`/v1/product/search?sortBy=createdAt&orderBy=desc`)
  );
  const json = await res.json();
  return { data: json.data.slice(0, limit) };
});
