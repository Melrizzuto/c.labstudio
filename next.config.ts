import type { NextConfig } from 'next';

/*
 * A normal Next.js build for Vercel: both pages are prerendered as static HTML,
 * only /api/views runs on the server (the visit counter).
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  /* don't write an AGENTS.md into the project on `next dev` */
  agentRules: false,
  /*
   * The pictures, videos and sounds in public/assets keep their names when they change, so browsers keep
   * them for a week (and revalidate after); Vercel's CDN keeps them until the next deploy.
   * /_next/static is already cached for a year by Next.js (hashed file names).
   */
  /* the CV page is a static file in public/cv: serve it at /cv/ */
  async rewrites() {
    return [{ source: '/cv/', destination: '/cv/index.html' }];
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, s-maxage=31536000, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
