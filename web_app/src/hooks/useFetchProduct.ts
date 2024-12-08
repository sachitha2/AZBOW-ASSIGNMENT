import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { API_ENDPOINTS } from "@/config/apiConfig";

/**
 * Custom hook to fetch product details based on a product ID.
 *
 * This hook manages the loading, error, and fetched product states. It fetches
 * data from the API endpoint specified in `API_ENDPOINTS.GET_PRODUCT_DETAILS`.
 *
 * @param {string | null} productId - The ID of the product to fetch. If null, the fetch will not be triggered.
 * @returns {{
 *   product: Product | null,
 *   loading: boolean,
 *   error: string | null
 * }} An object containing:
 * - `product`: The fetched product data or null if no product is fetched.
 * - `loading`: A boolean indicating whether the fetch is still in progress.
 * - `error`: A string containing the error message, or null if no error occurred.
 */
export const useFetchProduct = (productId: string | null) => {
  const [product, setProduct] = useState<Product | null>(null); // State to store the fetched product
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to store any errors

  useEffect(() => {
    /**
     * Fetch product details from the API.
     *
     * If `productId` is null, the function does nothing.
     */
    const fetchProductDetails = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const response = await fetch(
          API_ENDPOINTS.GET_PRODUCT_DETAILS(productId)
        );

        // Handle unsuccessful responses
        if (!response.ok) throw new Error("Failed to fetch product details");

        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return { product, loading, error };
};
