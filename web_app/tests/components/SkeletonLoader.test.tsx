import React from "react";
import { render, screen } from "@testing-library/react";
import { SkeletonLoader } from "@/components/SkeletonLoader";

// Mock Skeleton component
jest.mock("@/components/ui/skeleton", () => ({
  __esModule: true,
  Skeleton: ({ className }: { className: string }) => (
    <div data-testid="skeleton" className={className}></div>
  ),
}));

describe("SkeletonLoader Component", () => {
  it("renders all skeleton elements correctly", () => {
    render(<SkeletonLoader />);

    // Check for the number of skeletons rendered
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(7); // Total skeletons in the component

    // Verify specific skeleton classes
    expect(skeletons[0]).toHaveClass("h-[400px] w-full rounded-lg mb-4");
    expect(skeletons[1]).toHaveClass("h-8 w-1/3 mb-2");
    expect(skeletons[2]).toHaveClass("h-4 w-2/3 mb-4");
    expect(skeletons[3]).toHaveClass("h-4 w-1/4 mb-4");
    expect(skeletons[4]).toHaveClass("h-20 w-20 rounded-lg");
    expect(skeletons[5]).toHaveClass("h-20 w-20 rounded-lg");
    expect(skeletons[6]).toHaveClass("h-20 w-20 rounded-lg");
  });
});
