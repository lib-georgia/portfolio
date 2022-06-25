/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
//future: { webpack5: true }
module.exports = {
  nextConfig,
  images: { domains: ['firebasestorage.googleapis.com'], },
  stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  experimental: {
    optimizeFonts: true,
  },
  future: { webpack5: true }
}
