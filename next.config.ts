import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
  // Uncomment for static export (AWS S3 + CloudFront)
  // output: 'export',
  // images: { unoptimized: true },
  
  // For Docker/ECS deployment - enable standalone output
  output: 'standalone',
};

export default nextConfig;
