import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * SkeletonLoader Component
 *
 * A reusable skeleton loader component that provides placeholder content
 * while data is being loaded. It includes:
 * - A large skeleton box for an image or main content.
 * - Multiple smaller skeletons for headings, descriptions, or text.
 * - Thumbnail-sized skeletons for additional content or images.
 *
 * @component
 * @returns {JSX.Element} The rendered SkeletonLoader component.
 */
export const SkeletonLoader = (): JSX.Element => (
  <div className="p-6">
    {/* Main Content Skeleton */}
    <Skeleton className="h-[400px] w-full rounded-lg mb-4" />
    
    {/* Heading Skeleton */}
    <Skeleton className="h-8 w-1/3 mb-2" />
    
    {/* Description Skeleton */}
    <Skeleton className="h-4 w-2/3 mb-4" />
    <Skeleton className="h-4 w-1/4 mb-4" />
    
    {/* Thumbnails Skeleton */}
    <div className="flex gap-4">
      <Skeleton className="h-20 w-20 rounded-lg" />
      <Skeleton className="h-20 w-20 rounded-lg" />
      <Skeleton className="h-20 w-20 rounded-lg" />
    </div>
  </div>
);
