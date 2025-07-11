import { cache } from 'react';
import { apiPath } from '../api/utils';

export const getPromo = cache(async () => {
  const res = await fetch(apiPath('/v1/discount/'));
  const json = await res.json();
  return {
    data: json.data,
  };
});
