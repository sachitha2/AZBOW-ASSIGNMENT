import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "@/components/ProductList";

jest.mock("@/components/ui/skeleton", () => {
  return {
    __esModule: true,
    Skeleton: () => <div data-testid="skeleton"></div>,
  };
});

jest.mock("@/components/ItemCard", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="item-card"></div>,
  };
});

describe("ProductList Component", () => {
  const mockProducts = [
    {
      product_id: 1,
      product_name: "Product 1",
      price: 19.99,
      images: [
        { image_url: "/images/product-1.jpg" },
        { image_url: "/images/product-2.jpg" },
      ],
      category_name: "Category 1",
      category_id: 101,
    },
    {
      product_id: 2,
      product_name: "Product 2",
      price: 29.99,
      images: [
        { image_url: "/images/product-1.jpg" },
        { image_url: "/images/product-2.jpg" },
      ],
      category_name: "Category 2",
      category_id: 102,
    },
  ];

  it("renders skeletons when loading is true", () => {
    render(<ProductList products={[]} loading={true} />);

    // Expect 10 skeletons to render
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(10);
  });

  it("renders product cards when loading is false and products are provided", () => {
    render(<ProductList products={mockProducts} loading={false} />);

    // Expect ItemCard to be rendered for each product
    const itemCards = screen.getAllByTestId("item-card");
    expect(itemCards).toHaveLength(mockProducts.length);
  });

  it("renders no product cards when loading is false and no products are provided", () => {
    render(<ProductList products={[]} loading={false} />);

    // Expect no ItemCards to render
    const itemCards = screen.queryByTestId("item-card");
    expect(itemCards).not.toBeInTheDocument();
  });
});
