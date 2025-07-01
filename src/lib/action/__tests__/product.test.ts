import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNewProducts, getBestSellerProducts } from '../product';
import { PRODUCT_MOCK } from '@/mocks/datas/product';
import { apiPath } from '../../api/utils';

describe('Product Actions (unit test with vi.mocked)', () => {
  beforeEach(() => {
    global.fetch = vi.fn(); // reset fetch mock
  });

  describe('getNewProducts', () => {
    it('should fetch new products and return a limited list', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ data: PRODUCT_MOCK }),
      } as Response);

      const result = await getNewProducts();

      expect(fetch).toHaveBeenCalledWith(
        apiPath('/v1/product/search?sortBy=createdAt&orderBy=desc')
      );
      expect(result.data).toHaveLength(4);
      expect(result.data[0].id).toBe(PRODUCT_MOCK[0].id);
    });

    it('should return empty data if the fetch response is not ok', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Error' }),
      } as Response);

      const result = await getNewProducts();
      expect(result.data).toHaveLength(0);
    });
  });

  describe('getBestSellerProducts', () => {
    it('should fetch best-seller products', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ data: PRODUCT_MOCK }),
      } as Response);

      await getBestSellerProducts();

      expect(fetch).toHaveBeenCalledWith(
        apiPath('/v1/product/search?sortBy=sold&orderBy=desc')
      );
    });
  });
});
