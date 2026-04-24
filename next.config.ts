import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Encoder steps used by `quality` on `<Image />` — include 90–93 for editorial fidelity */
    qualities: [70, 75, 80, 85, 88, 90, 91, 92, 93, 95, 100],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 960, 1080, 1200, 1280, 1440, 1536, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640],
    /** Static /oryx assets — long cache at CDN edge */
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
