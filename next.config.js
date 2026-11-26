/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  // The site signs in with Google only: old password pages go to the login page.
  async redirects() {
    return [
      { source: "/registration", destination: "/login", permanent: true },
      { source: "/new-password", destination: "/login", permanent: true },
    ];
  },
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
    domains: [
      "agrosoft.uz",
      "agro-life.uz",
      "cdn.agrosoft.uz",
      "api.agrosoft.uz",
    ],
  },
};

module.exports = nextConfig;
