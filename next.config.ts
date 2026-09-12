import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Files under public/ are served with `max-age=0`, so the globe texture
        // would be re-fetched on every visit. These are content assets that only
        // change when we replace them, and a replacement means a new filename,
        // so they are safe to cache for a year.
        source: "/:dir(textures|flags)/:file*",
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
