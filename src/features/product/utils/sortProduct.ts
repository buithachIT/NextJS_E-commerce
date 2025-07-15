/* eslint-disable @typescript-eslint/no-explicit-any */
export function sortProducts<T>(products: T[], sort: string): T[] {
  const arr = [...products];
  if (sort === 'asc') {
    arr.sort((a, b) => {
      const priceA =
        typeof (a as any).price === 'string' ? parseFloat((a as any).price) : 0;
      const priceB =
        typeof (b as any).price === 'string' ? parseFloat((b as any).price) : 0;
      return priceA - priceB;
    });
  } else if (sort === 'desc') {
    arr.sort((a, b) => {
      const priceA =
        typeof (a as any).price === 'string' ? parseFloat((a as any).price) : 0;
      const priceB =
        typeof (b as any).price === 'string' ? parseFloat((b as any).price) : 0;
      return priceB - priceA;
    });
  } else if (sort === 'popular') {
    arr.sort((a, b) => ((b as any).sold ?? 0) - ((a as any).sold ?? 0));
  }
  return arr;
}
