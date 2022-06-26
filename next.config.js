/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  nextConfig,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    loader: 'akamai',
    path: '',
  },
  stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  experimental: {
    optimizeFonts: true,
  }
}
