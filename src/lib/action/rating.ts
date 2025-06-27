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
