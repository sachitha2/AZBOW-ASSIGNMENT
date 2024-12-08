import { renderHook, waitFor } from "@testing-library/react";
import { useFetchProduct } from "@/hooks/useFetchProduct";

const mockApiEndpoint = (productId: string) =>
  `http://example.com/api/products/${productId}`;

jest.mock("@/config/apiConfig", () => ({
  API_ENDPOINTS: {
    GET_PRODUCT_DETAILS: (productId: string) =>
      `http://example.com/api/products/${productId}`,
  },
}));

describe("useFetchProduct Hook", () => {
  const productId = "123";
  const mockProduct = {
    product_id: 123,
    product_name: "Test Product",
    price: 199.99,
    imageUrl: "http://example.com/images/test-product.jpg",
    category_name: "Category 1",
    in_stock: 5,
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
    const { result } = renderHook(() => useFetchProduct(null));

    expect(result.current.product).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("fetches product details successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    const { result } = renderHook(() => useFetchProduct(productId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(mockApiEndpoint(productId));
  });

  it("handles API failure gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useFetchProduct(productId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toBeNull();
    expect(result.current.error).toBe("Failed to fetch product details");
    expect(global.fetch).toHaveBeenCalledWith(mockApiEndpoint(productId));
  });

  it("does not fetch if productId is null", async () => {
    const { result } = renderHook(() => useFetchProduct(null));

    await waitFor(() => expect(result.current.loading).toBe(true));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.product).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("handles network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    const { result } = renderHook(() => useFetchProduct(productId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toBeNull();
    expect(result.current.error).toBe("Network Error");
    expect(global.fetch).toHaveBeenCalledWith(mockApiEndpoint(productId));
  });
});
