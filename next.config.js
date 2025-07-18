/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove trailing slashes from URLs
  trailingSlash: false,
  
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  
  // Image optimization configuration
  images: {
    domains: ['api.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/tienda',
        destination: '/lentes-de-contacto',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/lentes-de-contacto',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/lentes-de-contacto',
        permanent: true,
      },
    ]
  },
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
