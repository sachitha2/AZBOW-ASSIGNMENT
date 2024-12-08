import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Thumbnail } from "@/components/Thumbnail";
import "@testing-library/jest-dom";

jest.mock("next/image", () => ({ src, alt, className }: any) => (
  <img
    src={src}
    alt={alt}
    className={className}
    data-testid="thumbnail-image"
  />
));

describe("Thumbnail Component", () => {
  const mockOnClick = jest.fn();
  const mockImageUrl = "http://example.com/sample-thumbnail.jpg";

  it("renders the thumbnail image with the correct src and alt", () => {
    render(<Thumbnail imageUrl={mockImageUrl} onClick={mockOnClick} />);

    const image = screen.getByTestId("thumbnail-image");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockImageUrl);
    expect(image).toHaveAttribute("alt", "Thumbnail");
    expect(image).toHaveClass(
      "object-cover rounded-lg hover:ring-2 hover:ring-blue-500"
    );
  });

  it("calls onClick when the thumbnail is clicked", () => {
    render(<Thumbnail imageUrl={mockImageUrl} onClick={mockOnClick} />);

    const container = screen
      .getByRole("img", { name: "Thumbnail" })
      .closest("div");

    // Simulate click event
    fireEvent.click(container!);

    // Expect the mock function to be called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
