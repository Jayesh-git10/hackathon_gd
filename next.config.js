/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Configure static file serving
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  // This allows serving static files from the Photos directory
  async rewrites() {
    return [
      {
        source: '/Photos/:path*',
        destination: '/Photos/:path*',
      },
    ]
  },
}

module.exports = nextConfig 