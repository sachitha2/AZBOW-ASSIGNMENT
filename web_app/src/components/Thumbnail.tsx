import React from "react";
import Image from "next/image";

/**
 * Props for the Thumbnail component.
 * @typedef {Object} ThumbnailProps
 * @property {string} imageUrl - The URL of the thumbnail image.
 * @property {() => void} onClick - Callback function triggered when the thumbnail is clicked.
 */

/**
 * Thumbnail Component
 *
 * A small, clickable image component that can be used to display product thumbnails
 * or other preview images. It includes a hover effect for better interactivity.
 *
 * @component
 * @param {ThumbnailProps} props - The props for the Thumbnail component.
 * @returns {JSX.Element} The rendered Thumbnail component.
 */
export const Thumbnail: React.FC<ThumbnailProps> = ({ imageUrl, onClick }) => (
  <div className="relative w-16 h-16 cursor-pointer" onClick={onClick}>
    {/* Thumbnail Image */}
    <Image
      src={imageUrl}
      alt="Thumbnail"
      className="object-cover rounded-lg hover:ring-2 hover:ring-blue-500"
      fill
    />
  </div>
);
