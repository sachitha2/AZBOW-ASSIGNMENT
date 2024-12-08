"use client"; // Enables client-side rendering for this component
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

/**
 * A navigation bar component that stays fixed at the top of the screen.
 * It includes a brand logo or title and leverages a max-width container for consistent layout.
 *
 * The component uses a sticky position with a blurred background effect for a clean, modern look.
 *
 * @component
 * @returns {JSX.Element} The rendered NavBar component.
 */
const NavBar = (): JSX.Element => {
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      {/* Centered content with max-width */}
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-zinc-200">
          {/* Brand Logo or Title */}
          <Link href="/" className="flex z-40 font-semibold">
            Diamond <span className="text-green-600">Cosmetics</span>
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
