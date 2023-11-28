/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/static/images/**',
      },
    ],
  },
}

module.exports = nextConfig
