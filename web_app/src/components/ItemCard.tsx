import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import slugify from "slugify";
import { BASE_URL } from "@/constants";

/**
 * Represents a product displayed in the item card.
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} imageUrl - The relative path to the product's image.
 * @property {string} [category_name] - The optional name of the product category.
 */

/**
 * Props for the ItemCard component.
 * @typedef {Product} ItemCardProps
 */

/**
 * A card component that displays product details including name, price, image,
 * and category information. Allows navigation to product details or filtering
 * by category.
 *
 * @component
 * @param {ItemCardProps} props - The properties for the ItemCard component.
 * @returns {JSX.Element} The rendered ItemCard component.
 */
const ItemCard = ({
  id,
  name,
  price,
  imageUrl,
  category_name,
}: Product): JSX.Element => {
  const router = useRouter();

  // Create a slugified version of the product name for SEO-friendly URLs
  const slug = slugify(name, { lower: true });

  return (
    <Card key={id} className="hover:shadow-lg transition">
      {/* Product Name */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Product Image */}
        <div className="w-full h-48 relative">
          <Image
            src={`${BASE_URL}${imageUrl}`} // Combine base URL with the image path
            alt={name} // Descriptive alt text for accessibility
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>

        {/* Product Price */}
        <p className="text-gray-600 mt-2">
          Price:{" "}
          <span className="text-2xl font-semibold text-green-600">
            ${price.toFixed(2)}
          </span>
        </p>

        {/* Category Information */}
        <p className="text-gray-600 mt-2 cursor-pointer">
          {category_name &&
            Array.isArray(category_name) &&
            category_name.map((category, index) => (
              <strong key={index}>#{category.category_name}</strong>
            ))}
        </p>

        {/* View Product Button */}
        <button
          className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={() => {
            router.push(`/${slug}?id=${id}`);
          }}
        >
          View
        </button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
