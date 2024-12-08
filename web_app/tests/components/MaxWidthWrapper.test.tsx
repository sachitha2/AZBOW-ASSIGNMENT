import React from "react";
import { render, screen } from "@testing-library/react";
import MaxWidthWrapper from "../../src/components/MaxWidthWrapper";

// Mock `cn` utility
jest.mock("@/lib/utils", () => ({
  cn: (...args: string[]) => args.join(" "),
}));

describe("MaxWidthWrapper Component", () => {
  it("renders with default classes", () => {
    render(
      <MaxWidthWrapper>
        <div>Test Content</div>
      </MaxWidthWrapper>
    );

    const wrapper = screen.getByText("Test Content").parentElement;

    // Verify default classes
    expect(wrapper).toHaveClass(
      "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20"
    );
  });

  it("merges custom className with default classes", () => {
    render(
      <MaxWidthWrapper className="custom-class">
        <div>Test Content</div>
      </MaxWidthWrapper>
    );

    const wrapper = screen.getByText("Test Content").parentElement;

    // Verify both default and custom classes are applied
    expect(wrapper).toHaveClass(
      "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20"
    );
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders children correctly", () => {
    render(
      <MaxWidthWrapper>
        <div data-testid="child-element">Child Element</div>
      </MaxWidthWrapper>
    );

    // Verify children are rendered
    const child = screen.getByTestId("child-element");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Child Element");
  });
});
