import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

/**
 * Props for the PaginationControl component.
 * @typedef {Object} PaginationControlProps
 * @property {number} currentPage - The current active page number.
 * @property {number} totalPages - The total number of pages available.
 * @property {string} basePath - The base URL path for pagination links.
 */

/**
 * A pagination control component for navigating between pages.
 *
 * This component dynamically renders "Previous", "Next", and numbered page links
 * based on the `currentPage` and `totalPages` props. It uses the `basePath` to
 * generate URLs for navigation.
 *
 * @component
 * @param {PaginationControlProps} props - The props for the PaginationControl component.
 * @returns {JSX.Element} The rendered pagination navigation.
 */
const PaginationControl = ({
  currentPage,
  totalPages,
  basePath,
}: PaginationControlProps): JSX.Element => (
  <div className="mt-4 sm:m-4">
    <Pagination>
      <PaginationContent>
        {/* Render "Previous" link only if not on the first page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${basePath}&page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {/* Render page number links */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`${basePath}&page=${i + 1}`}
              isActive={i + 1 === currentPage} // Highlight active page
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Render "Next" link only if not on the last page */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${basePath}&page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  </div>
);

export default PaginationControl;
