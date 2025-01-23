/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Allows builds to proceed even if there are ESLint issues.
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
