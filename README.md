# GarbhaSetu

The Next.js application lives in `Desktop/garbhasetu`.

## Requirements

- Node.js 20.9 or later (CI uses Node.js 22)
- npm 10 or later

## Local development

```bash
cd Desktop/garbhasetu
npm ci
export SITE_URL=https://your-production-domain.example
npm run dev
```

`SITE_URL` must be the public HTTPS site origin with no path, query, or fragment
(for example, `https://garbhasetu.example`). It is required for the sitemap,
robots file, canonical URLs, and localized alternate links. Use the final
deployment origin for production. The CI placeholder is only for build-time
metadata validation and must not be deployed as the public origin.

Canonical URLs, alternate-language links, robots, and sitemap values are baked
into the static pages at build time. Rebuild after `SITE_URL` changes.

Deploy to a Node-compatible Next.js host or run `next start` behind a reverse
proxy. A static export does not preserve locale middleware, image optimization,
or the security headers from `next.config.ts`. The script policy permits
inline scripts because Next.js 15 uses inline bootstrap data for these static
routes; `object-src`, `base-uri`, and framing remain restricted.

## Checks and production server

```bash
npm run lint
npm run typecheck
npm test
SITE_URL=https://your-production-domain.example npm run build
SITE_URL=https://your-production-domain.example npm run start
```
