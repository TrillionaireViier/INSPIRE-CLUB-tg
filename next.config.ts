import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: '/user/:path*',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/user',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
