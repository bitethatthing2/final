/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: [
      'lh3.googleusercontent.com',
      'maps.googleapis.com',
      'maps.gstatic.com'
    ],
  },
  // Ensure trailing slashes for consistent routing
  trailingSlash: true,
}

module.exports = nextConfig
