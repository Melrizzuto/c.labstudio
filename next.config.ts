import type { NextConfig } from 'next';

/*
 * A normal Next.js build for Vercel: both pages are prerendered as static HTML,
 * only /api/views runs on the server (the visit counter).
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  /* don't write an AGENTS.md into the project on `next dev` */
  agentRules: false,
};

export default nextConfig;
