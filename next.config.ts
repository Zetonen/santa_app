import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //devIndicators: {
    //buildActivity: false,
  //  appIsrStatus: false,
  //},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    
  },
  output: 'standalone',
};

export default nextConfig;
