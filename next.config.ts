import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
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
    dangerouslyAllowSVG: true,
    unoptimized: true, // Needed for static exports
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self'; 
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com https://unpkg.com https://apps.elfsight.com https://cdnjs.cloudflare.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.firebaseio.com https://*.googleapis.com https://cdn.jsdelivr.net https://universe-static.elfsightcdn.com https://*.elfsightcdn.com https://*.service.elfsight.com; 
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://apps.elfsight.com https://*.elfsightcdn.com; 
              img-src 'self' blob: data: https://lh3.googleusercontent.com https://maps.googleapis.com https://maps.gstatic.com https://scontent.cdninstagram.com https://www.google-analytics.com https://www.googletagmanager.com https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.cdninstagram.com https://*.fbcdn.net https://*.elfsightcdn.com https://static.elfsight.com; 
              font-src 'self' data: https://fonts.gstatic.com https://apps.elfsight.com https://*.elfsightcdn.com; 
              connect-src 'self' https://fcmregistrations.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://*.firebaseio.com https://securetoken.googleapis.com https://www.googleapis.com https://maps.googleapis.com https://api.instagram.com https://graph.instagram.com https://*.google-analytics.com https://*.analytics.google.com https://*.googleapis.com https://*.supabase.co https://*.service.elfsight.com https://widget-data.service.elfsight.com https://core.service.elfsight.com https://scontent.cdninstagram.com https://service-reviews-ultimate.elfsight.com; 
              media-src 'self'; 
              frame-src 'self' https://apps.elfsight.com https://shop.sidehustlebar.com https://www.google.com/maps/ https://*.google.com; 
              worker-src 'self' blob:; 
              manifest-src 'self';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fix for commonjs modules needing fs/path on client-side build
    if (!isServer) {
        config.resolve.fallback = { fs: false, path: false };
    }
    return config;
  },
  // Configure distDir to match Netlify expectations
  distDir: '.next',
};

export default withPWA(nextConfig);
