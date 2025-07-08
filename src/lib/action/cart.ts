import { cache } from 'react';
import { apiPath } from '../api/utils';

export const getCartData = cache(async () => {
  const res = await fetch(apiPath('/v1/cart/'));
  const json = await res.json();
  return {
    data: json.data,
  };
});
