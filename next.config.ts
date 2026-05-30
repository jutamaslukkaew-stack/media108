import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  // Redirect old billboard slugs → new slugs (permanent 308)
  async redirects() {
    return [
      {
        source: "/billboard/pattaya-sukhumvit-01",
        destination: "/billboard/pattaya-dolphin-roundabout",
        permanent: true,
      },
      {
        source: "/billboard/pattaya-gateway",
        destination: "/billboard/bangsaen-burapha-university",
        permanent: true,
      },
      {
        source: "/billboard/eec-tech-square",
        destination: "/billboard/sriracha-robinson-junction",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
