import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductDetails } from "@/components/ProductDetails";
import { Product } from "@/types/product";

const mockSetMainImage = jest.fn();

const mockProduct: Product = {
  product_name: "Test Product",
  price: 199.99,
  in_stock: 5,
  details: {
    product_description: "This is a great product.",
    directions: "Use it with care.",
  },
  categories: [
    { category_name: "Category 1" },
    { category_name: "Category 2" },
  ],
  images: [
    { image_url: "/images/product-1.jpg" },
    { image_url: "/images/product-2.jpg" },
  ],
};

jest.mock("react-markdown", () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="react-markdown">{children}</div>
  );
});
jest.mock("remark-gfm", () => () => () => {});

describe("ProductDetails Component", () => {
  it("renders product details correctly", () => {
    render(
      <ProductDetails
        product={mockProduct}
        mainImage="http://localhost:3000/images/product-1.jpg"
        setMainImage={mockSetMainImage}
      />
    );

    // Check for product name
    expect(
      screen.getByRole("heading", { name: /Test Product/i })
    ).toBeInTheDocument();

    // Check for product description
    expect(screen.getByText("This is a great product.")).toBeInTheDocument();

    // Check for price
    expect(screen.getByText("$199.99")).toBeInTheDocument();

    // Check for stock availability
    expect(screen.getByText("5")).toBeInTheDocument();

    // Check for categories
    expect(screen.getByText("#Category 1")).toBeInTheDocument();
    expect(screen.getByText("#Category 2")).toBeInTheDocument();

    // Match text containing 'Directions' and 'Use it with care.'
    expect(screen.getByText(/Directions/i)).toBeInTheDocument();
    expect(screen.getByText(/Use it with care\./i)).toBeInTheDocument();
  });

  it("renders the main product image", () => {
    render(
      <ProductDetails
        product={mockProduct}
        mainImage="http://localhost:3000/images/product-1.jpg"
        setMainImage={mockSetMainImage}
      />
    );

    const mainImage = screen.getByAltText("Product");
    expect(mainImage).toBeInTheDocument();
    // Match the processed Next.js image src
    const expectedImageSrc = encodeURIComponent(
      "http://localhost:3000/images/product-1.jpg"
    );
    expect(mainImage).toHaveAttribute("src");
    expect(mainImage.getAttribute("src")).toContain(expectedImageSrc);
  });

  it("updates main image when thumbnail is clicked", () => {
    render(
      <ProductDetails
        product={mockProduct}
        mainImage="http://localhost:3000/images/product-1.jpg"
        setMainImage={mockSetMainImage}
      />
    );

    // Find the second thumbnail and simulate a click
    const thumbnails = screen.getAllByAltText("Thumbnail");
    expect(thumbnails.length).toBe(2);

    fireEvent.click(thumbnails[1]);

    // Assert that setMainImage is called with the correct image URL
    expect(mockSetMainImage).toHaveBeenCalledWith(
      "http://localhost:3000/images/product-2.jpg"
    );
  });

  it("disables Add to Cart button when product is out of stock", () => {
    const outOfStockProduct = { ...mockProduct, in_stock: 0 };

    render(
      <ProductDetails
        product={outOfStockProduct}
        mainImage="http://localhost:3000/images/product-1.jpg"
        setMainImage={mockSetMainImage}
      />
    );

    const addToCartButton = screen.getByRole("button", {
      name: /Add to Cart/i,
    });
    expect(addToCartButton).toBeDisabled();

    const stockStatus = screen.getByText("OUT OF STOCK");
    expect(stockStatus).toBeInTheDocument();
  });
});
