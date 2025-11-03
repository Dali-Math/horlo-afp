/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true, // <-- indispensable pour afficher les images locales
  },
};

module.exports = nextConfig;
