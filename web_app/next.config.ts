import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["placehold.co","media.ed.edmunds-media.com","localhost"], // Add any additional domains here
  },
  experimental:{
    forceSwcTransforms: true,
  }
};

export default nextConfig;
