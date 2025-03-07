/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'cdn.shopify.com', 'pilotscup.ae'],
  },
  experimental: {
    optimizeCss: false,
  },
  output: 'export',
  distDir: 'out'
};

module.exports = nextConfig;
