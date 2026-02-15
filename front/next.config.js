/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generates a self-contained production server in .next/standalone
  // This avoids shipping the whole node_modules and makes Docker images smaller.
  output: "standalone",
};

export default nextConfig;
