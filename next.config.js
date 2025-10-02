/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove 'export' to allow dynamic features like Firebase Auth
  // Netlify supports Next.js runtime features
}

module.exports = nextConfig
