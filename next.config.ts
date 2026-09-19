import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old URLs were live and may be linked or indexed. 301 them rather than
  // letting them 404.
  async redirects() {
    return [
      { source: "/about", destination: "/who-we-are", permanent: true },
      { source: "/solutions", destination: "/services", permanent: true },
      {
        source: "/products-services",
        destination: "/supplies",
        permanent: true,
      },
      { source: "/industries", destination: "/clients", permanent: true },
      {
        source: "/industries-clients",
        destination: "/clients",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Files under public/ are served with `max-age=0`, so the globe texture
        // would be re-fetched on every visit. These are content assets that only
        // change when we replace them, and a replacement means a new filename,
        // so they are safe to cache for a year.
        source: "/:dir(textures|flags|logos|videos|images)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
