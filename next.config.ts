import { withPlausibleProxy } from "next-plausible";

import { env } from "@/env";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["lh3.googleusercontent.com", "192.168.1.12", "localhost", "www.facebook.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },
};

export default withPlausibleProxy()(nextConfig);
