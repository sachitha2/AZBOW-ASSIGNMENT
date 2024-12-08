"use client"; // Enables client-side rendering for this component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For managing navigation and query parameters
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb"; // Breadcrumb component for navigation hierarchy
import useCategories from "@/hooks/useCategories"; // Custom hook to fetch categories
import useProducts from "@/hooks/useProducts"; // Custom hook to fetch paginated product data
import CategoryDropdown from "@/components/CategoryDropdown"; // Dropdown for category selection
import PaginationControl from "@/components/PaginationControl"; // Pagination controls for navigating product pages
import ProductList from "@/components/ProductList"; // Component to render the list of products

const ProductsPage = () => {
  // Fetch categories for the dropdown
  const { categories } = useCategories();

  // Router instance for programmatic navigation
  const router = useRouter();

  // Retrieve URL search parameters
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if 'page' is not in the URL
  const currentCategory = searchParams.get("category_id")
    ? parseInt(searchParams.get("category_id")!, 10)
    : null;

  // State for the currently selected category
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    currentCategory
  );

  // Fetch products and pagination data using a custom hook
  const { products, totalPages, loading } = useProducts(
    currentPage,
    selectedCategory
  );

  /**
   * Handles the selection of a category.
   * - Updates the selected category state.
   * - Navigates to page 1 of the newly selected category using query parameters.
   */
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    router.push(`/?page=1${categoryId ? `&category_id=${categoryId}` : ""}`);
  };

  // Breadcrumb configuration for navigation display
  const breadcrumbItems = [
    { label: "Products", href: "/" }, // Root breadcrumb item
    {
      label: selectedCategory
        ? categories.find((cat) => cat.category_id === selectedCategory)
            ?.category_name || "All Categories" // Dynamically display the selected category name
        : "All Categories", // Default display if no category is selected
    },
  ];

  return (
    <div className="container mx-auto py-8 flex flex-col min-h-screen p-4">
      {/* Dynamic breadcrumb navigation */}
      <DynamicBreadcrumb items={breadcrumbItems} />

      {/* Category selection dropdown */}
      <CategoryDropdown
        categories={categories} // List of available categories
        selectedCategory={selectedCategory} // Currently selected category
        onCategorySelect={handleCategorySelect} // Handler for category selection
      />

      {/* Product list or loader if data is still loading */}
      <ProductList products={products} loading={loading} />

      {/* Pagination controls */}
      <PaginationControl
        currentPage={currentPage} // Current page number
        totalPages={totalPages} // Total number of pages
        basePath={`/?${
          selectedCategory ? `category_id=${selectedCategory}&` : "" // Base path with category filter if applied
        }`}
      />
    </div>
  );
};

export default ProductsPage;
