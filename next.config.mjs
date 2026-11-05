/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This machine has limited RAM; building static pages across several worker
  // processes exhausts it. Keep page generation single-threaded.
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
