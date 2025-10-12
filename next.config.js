/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },
  trailingSlash: false,
  reactStrictMode: true,
  output: "standalone",

  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: false },
    ];
  },
};

module.exports = nextConfig;
