/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },
  trailingSlash: false,
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
