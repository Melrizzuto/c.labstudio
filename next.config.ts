import type { NextConfig } from 'next';

/*
 * A normal Next.js build for Vercel: both pages are prerendered as static HTML,
 * the API routes and the CV behind a personal link (/cv/k/<key>/) run on the server.
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
  /* the CV's fonts live in private/cv/fonts (the CV itself is in Supabase Storage): ship them with the personal-link route */
  outputFileTracingIncludes: {
    '/cv/k/[key]/[[...file]]': ['./private/cv/fonts/*'],
  },
  /* the old Vercel address sends everyone, and every shared link, to the real domain */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'clabstudio.vercel.app' }],
        destination: 'https://clabstudiomilano.com/:path*',
        permanent: true,
      },
      /* the old CV address in English now asks for the CV in English */
      { source: '/cv/', has: [{ type: 'query', key: 'lang', value: 'en' }], destination: '/en/cv/', permanent: false },
    ];
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
