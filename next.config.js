/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'links.papareact.com', 'm.media-amazon.com', 'logos-marques.com', 'amazonclone-mern-stack.herokuapp.com',
      'localhost'
    ],
  },
}

module.exports = nextConfig
