import { ITEMS_PER_PAGE, BASE_URL } from "@/constants";

const categoryQuery = (categoryId: number | undefined | null) =>
  categoryId ? `&category_id=${categoryId}` : "";

export const API_ENDPOINTS = {
  GET_PRODUCT_DETAILS: (productId: string) =>
    `${BASE_URL}/api/products/${productId}/details`,
  GET_PRODUCTS: (page: number, categoryId: number | undefined | null) =>
    `${BASE_URL}/api/products/?page=${page}&limit=${ITEMS_PER_PAGE}${categoryQuery(
      categoryId
    )}`,
  GET_CATEGORIES: `${BASE_URL}/api/categories`,
};

export default BASE_URL;
