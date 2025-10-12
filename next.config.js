/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },
  trailingSlash: false,
  reactStrictMode: true,
  output: "standalone",

  // Supprimer complètement la section "redirects"
  // Elle n'est plus nécessaire puisque defaultLocale est déjà "fr".
};

module.exports = nextConfig;
