/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: false,
  // Remove 'export' to allow dynamic features like Firebase Auth
  // Netlify supports Next.js runtime features
}

module.exports = nextConfig
