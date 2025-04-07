/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.elfsight.com',
      },
      {
        protocol: 'https',
        hostname: '*.elfsightcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.instagram.com',
      },
    ],
  },
  // Ensure trailing slashes are added
  trailingSlash: true,
  // Add webpack configuration if needed
  webpack(config, { isServer }) {
    // Add any webpack configurations here
    return config;
  }
};

module.exports = nextConfig;
