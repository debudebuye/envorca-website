/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/envorca-website",
  assetPrefix: "/envorca-website/",
  images: { unoptimized: true },
};

export default nextConfig;