import React from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Thumbnail } from "@/components/Thumbnail";

/**
 * Represents the props for the ProductDetails component.
 * @typedef {Object} ProductDetailsProps
 * @property {Product} product - The product object containing all product details.
 * @property {string} mainImage - The currently displayed main product image URL.
 * @property {(url: string) => void} setMainImage - A function to update the main image URL.
 */

/**
 * A component that displays detailed information about a product, including:
 * - Main image and thumbnails
 * - Product name, description, price, stock, and categories
 * - Directions rendered using Markdown
 *
 * @component
 * @param {ProductDetailsProps} props - The props for the ProductDetails component.
 * @returns {JSX.Element} The rendered ProductDetails component.
 */
export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  mainImage,
  setMainImage,
}): JSX.Element => (
  <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Product Image */}
      <div className="relative w-full max-w-[600px] h-auto mx-auto">
        <Image
          fill
          src={mainImage}
          alt="Product"
          className="rounded-lg object-contain"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="mt-4 flex lg:flex-col flex-wrap justify-center gap-4">
        {product.images.map((image, index) => (
          <Thumbnail
            key={index}
            imageUrl={`http://localhost:3000${image.image_url}`}
            onClick={() =>
              setMainImage(`http://localhost:3000${image.image_url}`)
            }
          />
        ))}
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-800">
          {product.product_name}
        </h1>

        {/* Product Description */}
        <p className="text-gray-600">{product?.details?.product_description}</p>

        {/* Price */}
        <div className="flex items-center space-x-4 text-gray-500">
          Price:
          <span className="text-4xl font-semibold text-green-600">
            ${product.price}
          </span>
        </div>

        {/* Stock Availability */}
        <div className="flex items-center space-x-4 text-gray-500">
          Available quantity:
          <span className="text-2xl font-semibold text-black-600">
            {product.in_stock === 0 ? "OUT OF STOCK" : product.in_stock}
          </span>
        </div>

        {/* Categories */}
        <p className="text-gray-500 text-lg">
          {product?.categories?.map((category, index) => (
            <strong key={index}>#{category.category_name}</strong>
          ))}
        </p>

        {/* Add to Cart Button */}
        <div className="flex space-x-4">
          <Button
            disabled={product.in_stock === 0}
            size="lg"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>

    {/* Additional Information: Directions in Markdown */}
    <div className="mt-12">
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {`# Directions\n${product?.details?.directions}`}
        </ReactMarkdown>
      </div>
    </div>
  </div>
);
