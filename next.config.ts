// import type { NextConfig } from "next";
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['img.youtube.com', 'i.ytimg.com'],
//   },
// };

// export default withNextIntl(nextConfig);
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com"
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com"
      }
    ]
  }
};

export default withNextIntl(nextConfig);
