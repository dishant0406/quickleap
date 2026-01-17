# Domain Redirecting Service - redirect.lazyweb.rocks

## Overview

Welcome to the Domain Redirecting Service! Our service provides a hassle-free solution for redirecting your domains without the burden of hosting them. With full HTTPS support and API compatibility, you can have peace of mind knowing that your domain redirects are handled efficiently and securely.

## Features

- **Hassle-Free Domain Redirects**: Simply enter your domain names, and we'll take care of the rest.
- **Full HTTPS Support**: Ensure secure connections with HTTPS support for all redirects.
- **API Compatibility**: Integrate our service with your applications using our API.

## Getting Started

To get started with our domain redirecting service, follow these simple steps:

1. **Sign Up**: Create an account on our website.
2. **Add Domains**: Enter the domain names you want to redirect.
3. **Configure Redirects**: Set up the target URLs for your domain redirects.
4. **Enjoy**: Sit back and relax while we handle the redirects for you.

## Contact

If you have any questions or need assistance, please contact our support team at admin@lazyweb.rocks.

Thank you for choosing our Domain Redirecting Service!

## Programmatic SEO system

The programmatic SEO pages live under `/solutions` and are generated from structured data in `lib/seo`.

To add or update pages:

1. Update base data in `lib/seo/data.ts` (topics, industries, locations).
2. Adjust templates in `lib/seo/content.ts` for titles, intros, sections, and FAQs.
3. Review internal linking in `lib/seo/links.ts` and sitemap sizing in `lib/seo/sitemap.ts`.
4. Verify content quality warnings in development (see `lib/seo/quality.ts`).

Sitemaps are served from `/sitemap.xml` and chunked at `/sitemap/{page}.xml` for scale.

To refresh location data from external APIs, run `pnpm seo:geo` to regenerate `lib/seo/geo.json`.
