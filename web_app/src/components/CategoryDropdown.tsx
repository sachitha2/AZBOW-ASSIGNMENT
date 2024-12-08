import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/**
 * Represents a single category in the dropdown.
 * @typedef {Object} Category
 * @property {number} category_id - The unique identifier for the category.
 * @property {string} category_name - The display name of the category.
 */

/**
 * Props for the CategoryDropdown component.
 * @typedef {Object} CategoryDropdownProps
 * @property {Category[]} categories - An array of category objects to display in the dropdown.
 * @property {number | null} selectedCategory - The ID of the currently selected category, or null for all categories.
 * @property {(categoryId: number | null) => void} onCategorySelect - Callback function when a category is selected.
 */

/**
 * A dropdown component for selecting product categories.
 *
 * @component
 * @param {CategoryDropdownProps} props - The props for the CategoryDropdown component.
 * @returns {JSX.Element} A rendered dropdown menu for selecting categories.
 */
const CategoryDropdown = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryDropdownProps) => (
  <div className="mb-4">
    {/* Dropdown Menu Trigger */}
    <DropdownMenu>
      <DropdownMenuTrigger className="px-4 py-2 bg-gray-100 border rounded-lg">
        {/* Display the selected category name or fallback to 'Select Category' */}
        {selectedCategory
          ? categories.find((cat) => cat.category_id === selectedCategory)
              ?.category_name || "Select Category"
          : "Select Category"}
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent forceMount>
        {/* Option to reset selection to 'All Categories' */}
        <DropdownMenuItem
          data-testid="all-categories"
          onClick={() => onCategorySelect(null)}
        >
          All Categories
        </DropdownMenuItem>

        {/* Map through categories and display each as a dropdown item */}
        {categories.map((category) => (
          <DropdownMenuItem
            key={category.category_id}
            data-testid={`category-${category.category_id}`}
            onClick={() => onCategorySelect(category.category_id)}
          >
            {category.category_name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default CategoryDropdown;
