/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'google.com'
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com'
      }
    ]
  }
}

export default nextConfig
