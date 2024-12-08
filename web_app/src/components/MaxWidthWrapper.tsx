import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

/**
 * Props for the MaxWidthWrapper component.
 * @typedef {Object} MaxWidthWrapperProps
 * @property {string} [className] - Additional custom class names to apply to the wrapper.
 * @property {ReactNode} children - React children elements to render inside the wrapper.
 */

/**
 * A utility wrapper component that sets a maximum width for its content
 * and centers it horizontally. It also accepts optional custom class names.
 *
 * @component
 * @param {MaxWidthWrapperProps} props - The props for the MaxWidthWrapper component.
 * @returns {JSX.Element} The rendered content wrapped inside a max-width container.
 */
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", // Default styling for centering and max-width
        className // Allow custom styling through className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
