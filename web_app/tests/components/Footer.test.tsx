import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";

describe("Footer Component", () => {
  it("renders the copyright text with the current year", () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    const copyrightText = screen.getByText(
      new RegExp(`© ${currentYear} All rights reserved`, "i")
    );

    expect(copyrightText).toBeInTheDocument();
  });

  it("renders the footer links correctly", () => {
    render(<Footer />);

    const termsLink = screen.getByRole("link", { name: "Terms" });
    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    const cookieLink = screen.getByRole("link", { name: "Cookie Policy" });

    expect(termsLink).toHaveAttribute("href", "#");
    expect(privacyLink).toHaveAttribute("href", "#");
    expect(cookieLink).toHaveAttribute("href", "#");
  });

  it("renders the footer structure correctly", () => {
    render(<Footer />);

    // Check for wrapper elements
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    const linksContainer = screen.getByText("Terms").closest("div");
    expect(linksContainer).toHaveClass("flex space-x-8");
  });
});
