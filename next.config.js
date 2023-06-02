/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["agrosoft.uz", "agro-life.uz"],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth",
      },
    ];
  },
};

module.exports = nextConfig;
