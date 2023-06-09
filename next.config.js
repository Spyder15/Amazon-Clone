/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains:['images-eu.ssl-images-amazon.com', 'm.media-amazon.com', 'lh3.googleusercontent.com']
  },
  env: {
    stripe_secret: process.env.STRIPE_SECRET,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
  }
}

module.exports = nextConfig
