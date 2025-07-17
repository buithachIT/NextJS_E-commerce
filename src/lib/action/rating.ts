import { cache } from 'react';
import { apiPath } from '../api/utils';

export const getCustomerRating = cache(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(apiPath('/v1/reviews/'));
  const json = await res.json();
  return {
    data: json.data,
  };
});
// export const getRatingByProductId = cache(async (productId: string) => {
//   const res = await fetch(apiPath(`/v1/reviews/product/${productId}`));
//   const json = await res.json();
//   return {
//     data: json.data,
//   };
// });
