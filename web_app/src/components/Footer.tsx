import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

/**
 * A footer component that renders the site copyright and essential links.
 *
 * This component is responsive, ensuring proper alignment of elements on both
 * small and large screens. It includes links to "Terms", "Privacy Policy",
 * and "Cookie Policy".
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = (): JSX.Element => {
  return (
    <footer className="bg-white h-20 relative">
      {/* Wrap content to a max-width container */}
      <MaxWidthWrapper>
        {/* Top border for visual separation */}
        <div className="border-t border-gray-200" />

        {/* Footer content area with responsive layout */}
        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          {/* Left Section: Copyright Text */}
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Right Section: Navigation Links */}
          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
