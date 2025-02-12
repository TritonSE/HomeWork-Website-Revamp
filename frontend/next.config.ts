import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    /* config options here */
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
