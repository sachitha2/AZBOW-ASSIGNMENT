import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "@/hooks/useProducts";

jest.mock("@/config/apiConfig", () => ({
  API_ENDPOINTS: {
    GET_PRODUCTS: (page: number, categoryId?: number | null) =>
      categoryId
        ? `http://example.com/api/products?page=${page}&category_id=${categoryId}`
        : `http://example.com/api/products?page=${page}`,
  },
}));

describe("useProducts Hook", () => {
  const mockPage = 1;
  const mockCategoryId = 10;

  const mockProductsResponse = {
    products: [
      {
        category_id: 10,
        product_id: 1,
        product_name: "Product 1",
        price: 100,
        imageUrl: "http://example.com/product1.jpg",
      },
      {
        category_id: 10,
        product_id: 2,
        product_name: "Product 2",
        price: 200,
        imageUrl: "http://example.com/product2.jpg",
      },
    ],
    totalPages: 5,
  };

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it("returns initial state", () => {
    const { result } = renderHook(() => useProducts(mockPage));

    expect(result.current.products).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.loading).toBe(true);
  });

  it("fetches products successfully with categoryId", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProductsResponse,
    });

    const { result } = renderHook(() => useProducts(mockPage, mockCategoryId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProductsResponse.products);
    expect(result.current.totalPages).toBe(mockProductsResponse.totalPages);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://example.com/api/products?page=${mockPage}&category_id=${mockCategoryId}`
    );
  });

  it("fetches products successfully without categoryId", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProductsResponse,
    });

    const { result } = renderHook(() => useProducts(mockPage));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProductsResponse.products);
    expect(result.current.totalPages).toBe(mockProductsResponse.totalPages);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://example.com/api/products?page=${mockPage}`
    );
  });

  it("handles API error gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useProducts(mockPage, mockCategoryId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://example.com/api/products?page=${mockPage}&category_id=${mockCategoryId}`
    );
  });

  it("handles network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const { result } = renderHook(() => useProducts(mockPage, mockCategoryId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://example.com/api/products?page=${mockPage}&category_id=${mockCategoryId}`
    );
  });
});
