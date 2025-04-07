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
    ],
  },
  // Ensure trailing slashes are added
  trailingSlash: true,
  // Add Content Security Policy headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://maps.googleapis.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://maps.googleapis.com https://*.google.com https://*.gstatic.com;
              frame-src 'self' https://www.google.com;
              connect-src 'self' https://*.googleapis.com;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  },
  // Add webpack configuration if needed
  webpack(config, { isServer }) {
    // Add any webpack configurations here
    return config;
  }
};

module.exports = nextConfig;
