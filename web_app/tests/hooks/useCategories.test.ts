import { renderHook, waitFor } from "@testing-library/react";
import useCategories from "@/hooks/useCategories";
import { API_ENDPOINTS } from "@/config/apiConfig";

const mockApiEndpoint = "http://example.com/api/categories";

jest.mock("@/config/apiConfig", () => ({
  API_ENDPOINTS: {
    GET_CATEGORIES: mockApiEndpoint,
  },
}));

describe("useCategories Hook", () => {
  beforeAll(() => {
    global.fetch = jest.fn(); // Global fetch mock setup
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  afterAll(() => {
    delete global.fetch; // Clean up after all tests
  });

  it("fetches categories successfully", async () => {
    const mockCategories = [
      { category_id: 1, category_name: "Category 1" },
      { category_id: 2, category_name: "Category 2" },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.error).toBeNull();

    // Verify fetch was called with the correct endpoint
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINTS.GET_CATEGORIES);
  });

  it("handles fetch error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch categories.");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINTS.GET_CATEGORIES);
  });

  it("handles network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe("Network error");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINTS.GET_CATEGORIES);
  });
});
