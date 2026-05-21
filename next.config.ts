import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "iblam.ac.id",
      },
      {
        protocol: "https",
        hostname: "assets.iblmlaw.group",
      },
    ],
  },
};

export default nextConfig;
