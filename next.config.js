// Configuration for Next.js
const withPWA = require('@ducanh2912/next-pwa')({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    importScripts: ['/firebase-messaging-sw.js'],
  },
});

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
  // Required for static export
  distDir: 'out',
  // Ensure trailing slashes are added
  trailingSlash: true,
  // Add headers for security and proper content types
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com https://unpkg.com https://apps.elfsight.com https://cdnjs.cloudflare.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.firebaseio.com https://*.googleapis.com https://cdn.jsdelivr.net https://universe-static.elfsightcdn.com https://*.elfsightcdn.com https://*.service.elfsight.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://apps.elfsight.com https://*.elfsightcdn.com; img-src 'self' blob: data: https://lh3.googleusercontent.com https://maps.googleapis.com https://maps.gstatic.com https://scontent.cdninstagram.com https://www.google-analytics.com https://www.googletagmanager.com https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.cdninstagram.com https://*.fbcdn.net https://*.elfsightcdn.com https://static.elfsight.com; font-src 'self' data: https://fonts.gstatic.com https://apps.elfsight.com https://*.elfsightcdn.com;`
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
}

module.exports = withPWA(nextConfig);
