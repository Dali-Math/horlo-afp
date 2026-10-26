/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  images: {
    unoptimized: true, // indispensable pour afficher les images locales
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/theorie/histoire',
        destination: '/theorie/histoire-horlogerie-suisse',
        permanent: true,
      },
    ];
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'public/**/*',
        'node_modules/**/*',
        '*.pdf',
        '*.mp4',
        'public/videos/**/*',
        'public/pdfs/**/*',
      ],
    },
  },
};

module.exports = nextConfig;
