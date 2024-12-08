import React from "react";
import { render, screen } from "@testing-library/react";
import PaginationControl from "../../src/components/PaginationControl";

describe("PaginationControl Component", () => {
  const basePath = "/products?category_id=1";

  it("renders pagination links correctly", () => {
    render(
      <PaginationControl currentPage={2} totalPages={5} basePath={basePath} />
    );

    // Check for the Previous button
    const prevLink = screen.getByRole("link", { name: "Go to previous page" });
    expect(prevLink).toHaveAttribute("href", "/products?category_id=1&page=1");

    // Check for all pagination links
    const paginationLinks = screen.getAllByRole("link", { name: /^\d+$/ });
    expect(paginationLinks.length).toBe(5); // Total pages

    expect(paginationLinks[0]).toHaveAttribute(
      "href",
      "/products?category_id=1&page=1"
    );
    expect(paginationLinks[1]).toHaveAttribute(
      "href",
      "/products?category_id=1&page=2"
    );
    expect(paginationLinks[2]).toHaveAttribute(
      "href",
      "/products?category_id=1&page=3"
    );
    expect(paginationLinks[3]).toHaveAttribute(
      "href",
      "/products?category_id=1&page=4"
    );
    expect(paginationLinks[4]).toHaveAttribute(
      "href",
      "/products?category_id=1&page=5"
    );

    // Check for the Next button
    const nextLink = screen.getByRole("link", { name: "Go to next page" });
    expect(nextLink).toHaveAttribute("href", "/products?category_id=1&page=3");
  });

  it("does not render Previous button on the first page", () => {
    render(
      <PaginationControl currentPage={1} totalPages={5} basePath={basePath} />
    );

    // Ensure the Previous button does not exist
    const prevLink = screen.queryByRole("link", {
      name: "Go to previous page",
    });
    expect(prevLink).not.toBeInTheDocument();

    // Check for Next button
    const nextLink = screen.getByRole("link", { name: "Go to next page" });
    expect(nextLink).toHaveAttribute("href", "/products?category_id=1&page=2");
  });

  it("does not render Next button on the last page", () => {
    render(
      <PaginationControl currentPage={5} totalPages={5} basePath={basePath} />
    );

    // Ensure the Next button does not exist
    const nextLink = screen.queryByRole("link", { name: "Go to next page" });
    expect(nextLink).not.toBeInTheDocument();

    // Check for Previous button
    const prevLink = screen.getByRole("link", { name: "Go to previous page" });
    expect(prevLink).toHaveAttribute("href", "/products?category_id=1&page=4");
  });

  it("highlights the active page correctly", () => {
    render(
      <PaginationControl currentPage={3} totalPages={5} basePath={basePath} />
    );

    // Ensure the active page is highlighted
    const activePage = screen.getByRole("link", { name: "3" });
    expect(activePage).toHaveAttribute("aria-current", "page");
  });
});
