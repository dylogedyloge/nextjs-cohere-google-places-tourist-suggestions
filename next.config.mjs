/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.gstatic.com",
        pathname: "/mapfiles/place_api/icons/**",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        pathname: "/maps/api/place/photo**",
      },
    ],
    deviceSizes: [100, 400], // Add sizes for small and large images
  },
};

export default nextConfig;
