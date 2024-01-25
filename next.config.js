/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/robots.txt",
      },
      {
        source: "/sitemap.txt",
        destination: "/sitemap.txt",
      },
    ];
  },
  images: {
    domains: ["agrosoft.uz", "agro-life.uz", "cdn.agrosoft.uz", "cnt0.www.uz"],
  },
};

module.exports = nextConfig;
