/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["agrosoft.uz", "agro-life.uz", "cdn.agrosoft.uz", "cnt0.www.uz"],
  },
};

module.exports = nextConfig;
