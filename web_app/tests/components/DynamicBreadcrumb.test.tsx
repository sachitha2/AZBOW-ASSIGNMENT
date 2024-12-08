import React from "react";
import { render, screen } from "@testing-library/react";
import { DynamicBreadcrumb } from "../../src/components/DynamicBreadcrumb";

describe("DynamicBreadcrumb Component", () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics" },
  ];

  it("renders the correct number of breadcrumb items", () => {
    render(<DynamicBreadcrumb items={breadcrumbItems} />);

    // Query all breadcrumb items
    const breadcrumbItemsRendered = screen.getAllByRole("listitem");
    expect(breadcrumbItemsRendered.length).toBe(3); // Three breadcrumb items

    // Filter actual links (anchor tags with href)
    const breadcrumbLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") !== null);

    expect(breadcrumbLinks.length).toBe(2); // Home and Products are links

    // Verify breadcrumb page (non-link)
    const breadcrumbPage = screen.getByText("Electronics");
    expect(breadcrumbPage).toBeInTheDocument();
    expect(breadcrumbPage.closest("a")).toBeNull(); // Not wrapped in a link
  });

  it("renders links correctly for items with href", () => {
    render(<DynamicBreadcrumb items={breadcrumbItems} />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    const productsLink = screen.getByRole("link", { name: "Products" });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(productsLink).toHaveAttribute("href", "/products");
  });

  it("renders breadcrumb pages without links for items without href", () => {
    render(<DynamicBreadcrumb items={breadcrumbItems} />);
    const electronicsPage = screen.getByText("Electronics");

    expect(electronicsPage).toBeInTheDocument();
    expect(electronicsPage.closest("a")).toBeNull(); // Not a link
  });

  it("renders separators between breadcrumb items", () => {
    render(<DynamicBreadcrumb items={breadcrumbItems} />);
    const separators = screen.getAllByText("/", { selector: "span" });

    expect(separators.length).toBe(breadcrumbItems.length - 1); // One less than items
  });
});
