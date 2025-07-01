import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { getNewProducts } from '../product';
import { PRODUCT_MOCK } from '@/mocks/datas/product';
import { server } from '@/mocks/server'; // Điều chỉnh nếu path khác

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Product Actions (integration test with MSW)', () => {
    it('should fetch new products using MSW mock', async () => {
        const result = await getNewProducts();

        expect(result.data).toHaveLength(4);
        expect(result.data[0].id).toBe(PRODUCT_MOCK[0].id);
    });
});
