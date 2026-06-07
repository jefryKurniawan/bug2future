import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    deviceSizes: [480, 640, 768, 1024, 1280],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
