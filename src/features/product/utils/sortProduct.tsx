export function getSortParams(sort: string) {
  if (sort === 'asc' || sort === 'desc') {
    return { sortBy: 'price', orderBy: sort };
  }
  if (sort === 'popular') {
    return { sortBy: 'sold', orderBy: 'desc' };
  }
  return { sortBy: 'createdAt', orderBy: 'desc' };
}
