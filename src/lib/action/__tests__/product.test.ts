import { describe, it, expect, vi, beforeEach } from "vitest";
import { getNewProducts, getBestSellerProducts } from "../product";
import { PRODUCT_MOCK } from "@/mocks/datas/product";
import { apiPath } from "../../api/utils";

// Mock the global fetch function
global.fetch = vi.fn();

describe("Product Actions", () => {
  beforeEach(() => {
    // Clear mock history before each test
    vi.mocked(fetch).mockClear();
  });

  describe("getNewProducts", () => {
    it("should fetch new products and return a limited list", async () => {
      const mockResponse = {
        data: PRODUCT_MOCK,
      };

      // Setup the mock response for fetch
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getNewProducts(2);

      // Check if fetch was called correctly
      expect(fetch).toHaveBeenCalledWith(
        apiPath("/v1/product/search?sortBy=createdAt&orderBy=desc")
      );

      // Check if the data is correctly sliced
      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe(PRODUCT_MOCK[0].id);
    });

    it("should throw an error if the fetch response is not ok", async () => {
      // Setup a failed mock response
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Error" }),
      } as Response);

      // Expect the function to throw an error because res.json() will be called on a non-ok response
      await expect(getNewProducts()).rejects.toThrow();
    });
  });

  describe("getBestSellerProducts", () => {
    it("should fetch best-seller products", async () => {
      const mockResponse = { data: PRODUCT_MOCK };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await getBestSellerProducts();

      expect(fetch).toHaveBeenCalledWith(
        apiPath("/v1/product/search?sortBy=sold&orderBy=desc")
      );
    });
  });
});
