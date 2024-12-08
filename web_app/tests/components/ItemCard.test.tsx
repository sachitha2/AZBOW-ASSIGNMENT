import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCard from "../../src/components/ItemCard";
import { useRouter } from "next/navigation";

// Mock `useRouter` from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock BASE_URL constant
jest.mock("@/constants", () => ({
  BASE_URL: "http://example.com",
}));

describe("ItemCard Component", () => {
  const mockPush = jest.fn();

  const mockProduct = {
    id: 1,
    name: "Sample Product",
    price: 99.99,
    imageUrl: "/images/sample.jpg",
    category_name: [
      { category_name: "Electronics" },
      { category_name: "Home Deco" },
    ],
    category_id: 123,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  it("renders product information correctly", () => {
    render(<ItemCard {...mockProduct} />);

    // Check for product name
    expect(screen.getByText("Sample Product")).toBeInTheDocument();

    // Check for product price
    expect(screen.getByText("$99.99")).toBeInTheDocument();

    // Check for image
    const image = screen.getByAltText("Sample Product");
    expect(image.getAttribute("src")).toContain(
      encodeURIComponent("http://example.com/images/sample.jpg")
    );

    // Check for category
    expect(screen.getByText("#Electronics")).toBeInTheDocument();
  });

  it("redirects to the product page when 'View' button is clicked", () => {
    render(<ItemCard {...mockProduct} />);

    const viewButton = screen.getByRole("button", { name: "View" });
    fireEvent.click(viewButton);

    // Verify router.push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/sample-product?id=1");
  });

  it("handles slug generation correctly", () => {
    render(<ItemCard {...mockProduct} />);

    const viewButton = screen.getByRole("button", { name: "View" });
    fireEvent.click(viewButton);

    // Ensure the slug is properly generated
    expect(mockPush).toHaveBeenCalledWith("/sample-product?id=1");
  });
});
