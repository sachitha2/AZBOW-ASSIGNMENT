"use client"; // Enables client-side rendering for this component
import { useState } from "react";
import { useSearchParams } from "next/navigation"; // For accessing URL search parameters
import { useFetchProduct } from "@/hooks/useFetchProduct"; // Custom hook to fetch product data
import { SkeletonLoader } from "@/components/SkeletonLoader"; // Placeholder loader component while data is loading
import { ProductDetails } from "@/components/ProductDetails"; // Component to display product details

const ProductPage = () => {
  // Get search parameters from the URL
  const searchParams = useSearchParams();
  const productId = searchParams.get("id"); // Extract 'id' parameter from the URL

  // Fetch product data using a custom hook
  const { product, loading, error } = useFetchProduct(productId);
  // State to manage the currently displayed main image
  const [mainImage, setMainImage] = useState<string>("");
  // Show a loading skeleton while fetching product data
  if (loading) return <SkeletonLoader />;
  // Display error message if the product fetch fails
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Render product details only if product data exists */}
      {product && (
        <ProductDetails
          product={product} // Pass the product data to the ProductDetails component
          mainImage={
            mainImage || `http://localhost:3000${product.images[0]?.image_url}`
          }
          setMainImage={setMainImage} // Pass the state setter to allow updating the main image
        />
      )}
    </div>
  );
};

export default ProductPage;
