import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/apiConfig";

/**
 * Represents a single product.
 * @typedef {Object} Product
 * @property {number} category_id - The ID of the product's category.
 * @property {number} product_id - The unique identifier for the product.
 * @property {string} product_name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} imageUrl - The URL of the product's image.
 */

/**
 * Custom hook to fetch a paginated list of products.
 *
 * This hook retrieves product data based on the provided page number and optional category ID.
 * It manages the loading, error, and pagination states for the fetched products.
 *
 * @param {number} page - The current page number for pagination.
 * @param {number | null} [categoryId] - The optional category ID to filter products by category.
 * @returns {{
 *   products: Product[],
 *   totalPages: number,
 *   loading: boolean
 * }} An object containing:
 * - `products`: An array of products fetched from the API.
 * - `totalPages`: The total number of pages available.
 * - `loading`: A boolean indicating whether the data is still being fetched.
 */
const useProducts = (page: number, categoryId?: number | null) => {
  const [products, setProducts] = useState<Product[]>([]); // State for storing fetched products
  const [totalPages, setTotalPages] = useState(0); // State for storing total pages
  const [loading, setLoading] = useState(false); // State for tracking loading status
  const [error, setError] = useState(""); // State for storing error messages

  useEffect(() => {
    /**
     * Fetch products from the API based on the current page and optional category ID.
     *
     * Handles loading and error states during the fetch operation.
     */
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          API_ENDPOINTS.GET_PRODUCTS(page, categoryId)
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setTotalPages(data.totalPages);
        } else {
          setError("Failed to fetch products.");
        }
      } catch (error) {
        setError(`Error fetching products: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, categoryId]);

  return { products, totalPages, loading, error };
};

export default useProducts;
