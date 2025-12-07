import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //devIndicators: {
    //buildActivity: false,
  //  appIsrStatus: false,
  //},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
