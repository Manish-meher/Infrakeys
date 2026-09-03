/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.infrakeys.com",
        port: "",
      },
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      // },
    ],
  },
  async redirects() {
    return [
      // The /new-home preview is now the site root.
      {
        source: "/new-home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

export default nextConfig;
