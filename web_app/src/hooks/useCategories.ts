import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/apiConfig";

/**
 * Represents a category object.
 * @typedef {Object} Category
 * @property {number} category_id - The unique identifier for the category.
 * @property {string} category_name - The name of the category.
 */

/**
 * Custom hook to fetch a list of categories from the API.
 *
 * This hook manages the loading, success, and error states while fetching
 * categories. It retrieves data from the endpoint defined in `API_ENDPOINTS.GET_CATEGORIES`.
 *
 * @returns {{ 
 *   categories: Category[], 
 *   loading: boolean, 
 *   error: string | null 
 * }} An object containing:
 * - `categories`: An array of category objects.
 * - `loading`: A boolean indicating whether the data is being fetched.
 * - `error`: A string containing an error message, or null if no error occurred.
 */
const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]); // State for storing fetched categories
  const [loading, setLoading] = useState(false); // State for tracking loading status
  const [error, setError] = useState<string | null>(null); // State for storing error message

  useEffect(() => {
    /**
     * Fetch categories from the API endpoint.
     *
     * This function updates loading and error states based on the fetch result.
     */
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.GET_CATEGORIES);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories.");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
