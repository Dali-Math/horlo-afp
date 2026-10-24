/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true, // indispensable pour afficher les images locales
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
