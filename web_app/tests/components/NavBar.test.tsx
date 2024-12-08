import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../../src/components/NavBar";
import Link from "next/link";

jest.mock("@/components/MaxWidthWrapper", () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="max-width-wrapper">{children}</div>
  );
});

// Mock Link from next/link
jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

describe("NavBar Component", () => {
  it("renders the navigation bar with correct structure", () => {
    render(<NavBar />);

    // Check for nav element
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    // Check for MaxWidthWrapper
    const wrapper = screen.getByTestId("max-width-wrapper");
    expect(wrapper).toBeInTheDocument();

    // Check for the link
    const link = screen.getByRole("link", { name: /Diamond Cosmetics/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the correct link text with styling", () => {
    render(<NavBar />);

    const link = screen.getByRole("link", { name: /Diamond Cosmetics/i });

    // Check text content
    expect(link).toHaveTextContent("Diamond");
    expect(link).toHaveTextContent("Cosmetics");

    // Verify part of the text contains specific styles
    expect(link).toHaveTextContent("Diamond");
    expect(screen.getByText("Cosmetics")).toBeInTheDocument();
  });
});
