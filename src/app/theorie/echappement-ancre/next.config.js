/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.horology-reference.com'],
  },
  experimental: {
    appDir: true,
    serverComponents: true,
  },
  i18n: {
    locales: ['fr', 'en', 'de', 'ja'],
    defaultLocale: 'fr',
  },
}

module.exports = nextConfig
