import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CategoryDropdown from "../../src/components/CategoryDropdown";
describe("CategoryDropdown Component", () => {
  const categories = [
    { category_id: 1, category_name: "Electronics" },
    { category_id: 2, category_name: "Clothing" },
    { category_id: 3, category_name: "Books" },
  ];

  const mockOnCategorySelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dropdown with 'Select Category' by default", () => {
    render(
      <CategoryDropdown
        categories={categories}
        selectedCategory={null}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  it("displays the selected category name when a category is selected", () => {
    render(
      <CategoryDropdown
        categories={categories}
        selectedCategory={2}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText("Clothing")).toBeInTheDocument();
  });
});
