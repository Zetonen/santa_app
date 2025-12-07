import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //devIndicators: {
    //buildActivity: false,
  //  appIsrStatus: false,
  //},
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
        pathname: '/dk3syrsg5/image/upload/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
