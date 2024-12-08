import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ItemCard from "@/components/ItemCard";

/**
 * Represents a product to be displayed in the product list.
 * @typedef {Object} Product
 * @property {number} product_id - The unique identifier for the product.
 * @property {string} product_name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} imageUrl - The URL of the product's image.
 * @property {string} [category_name] - The optional category name of the product.
 * @property {number} [category_id] - The optional category ID of the product.
 */

/**
 * Props for the ProductList component.
 * @typedef {Object} ProductListProps
 * @property {Product[]} products - An array of product objects to display.
 * @property {boolean} loading - Indicates whether the product data is still being loaded.
 */

/**
 * A component that renders a list of products as a responsive grid.
 * - If `loading` is true, it displays placeholder skeleton loaders.
 * - If `loading` is false, it renders product cards for each product in the list.
 *
 * @component
 * @param {ProductListProps} props - The props for the ProductList component.
 * @returns {JSX.Element} The rendered ProductList component.
 */
const ProductList = ({ products, loading }: ProductListProps): JSX.Element => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {/* Display Skeletons when loading */}
    {loading
      ? Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        ))
      : /* Render Product Cards */
        products.map((product) => (
          <ItemCard
            key={product.product_id}
            id={product.product_id}
            name={product.product_name}
            price={product.price}
            imageUrl={product?.images[0]?.image_url}
            category_name={product?.categories}
          />
        ))}
  </div>
);

export default ProductList;
