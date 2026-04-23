import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
};

export default nextConfig;
