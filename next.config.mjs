/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["antd"],
  },
  transpilePackages: ["antd"],
  images: {
    domains: [],
  },
};

export default nextConfig;
