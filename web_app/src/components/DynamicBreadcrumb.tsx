import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

/**
 * Represents a single breadcrumb item.
 * @typedef {Object} BreadcrumbItemProps
 * @property {string} label - The display text for the breadcrumb item.
 * @property {string} [href] - The optional URL for navigation. If omitted, the item is considered the current page.
 */

/**
 * Props for the DynamicBreadcrumb component.
 * @typedef {Object} BreadcrumbProps
 * @property {BreadcrumbItemProps[]} items - An array of breadcrumb items to render.
 */

/**
 * A dynamic breadcrumb component for navigation.
 *
 * Renders a list of breadcrumb items with optional links. If a breadcrumb item
 * has no `href`, it is displayed as the current page.
 *
 * @component
 * @param {BreadcrumbProps} props - The props for the DynamicBreadcrumb component.
 * @returns {JSX.Element} The rendered breadcrumb navigation.
 */
export const DynamicBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="mb-4">
      {/* Breadcrumb container */}
      <Breadcrumb>
        <BreadcrumbList>
          {/* Map through breadcrumb items */}
          {items.map((item, index) => (
            <BreadcrumbItem key={index}>
              {/* If href is provided, render as a link; otherwise, render as current page */}
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}

              {/* Render separator except after the last item */}
              {index < items.length - 1 && (
                <span aria-hidden="true" className="breadcrumb-separator">
                  /
                </span>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
