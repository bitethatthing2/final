// Configuration for Next.js
const nextConfig = {
  output: 'export',
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
    ],
  },
  // Ensure trailing slashes are added
  trailingSlash: true,
  // Add webpack configuration if needed
  webpack(config, { isServer }) {
    // Add any webpack configurations here
    return config;
  }
}

module.exports = nextConfig;
