# PEDTransforms

Marketing website for **PEDTransforms**: digital transformation, automation and smart systems, technology talent and advisory. Includes a blog powered by [Sanity](https://www.sanity.io/) and a contact form delivered by [Resend](https://resend.com/).

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS
- Sanity (blog content, embedded Studio at `/studio`)
- Resend (contact form email)

## Pages

Home, About Us, Our Services, six service pages under `/services/*`, Blog, and Contact Us.

- Company copy: `src/data/site.ts`
- Services, FAQs and SEO text: `src/data/services.ts`
- Team members: `src/data/team.ts` (the Team section on About Us appears once this list has entries)
- Contact details: `contact` in `src/data/site.ts` (each item appears on the site and in structured data only when filled in)

## Setup

1. Install dependencies: `npm install`
2. Copy the env template: `cp .env.example .env.local`
3. Fill in `.env.local`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL, used for canonical links, sitemap and share links |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For the blog | Sanity project ID from [sanity.io/manage](https://www.sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | For the blog | Dataset, usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | For the blog | API version date, e.g. `2025-10-01` |
| `SANITY_API_READ_TOKEN` | For previews | Viewer token, used for draft mode |
| `SANITY_API_WRITE_TOKEN` | For seeding | Editor token, used only by `npm run sanity:seed` |
| `SANITY_REVALIDATE_SECRET` | For webhooks | Shared secret for `/api/revalidate` |
| `RESEND_API_KEY` | For the contact form | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | For the contact form | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | For the contact form | Sender on a domain verified in Resend, e.g. `PEDTransforms <website@yourdomain.com>` |
| `GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console token |
| `BING_SITE_VERIFICATION` | Optional | Bing Webmaster Tools token |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Multi-instance hosting | Stable key so form submissions work across instances |

4. In the Sanity project's **API → CORS origins**, add `http://localhost:3000` (and your production URL) with **Allow credentials** checked.
5. Optional: load starter categories and sample posts with `npm run sanity:seed`. Review the sample posts before going live.
6. Run `npm run dev` and open [http://localhost:3000](http://localhost:3000). Edit blog content at [http://localhost:3000/studio](http://localhost:3000/studio).

## Contact form

Submissions are validated on the server, protected by a hidden honeypot field, a minimum fill time and a per-IP limit of 5 messages per 10 minutes, then emailed via Resend with the sender's address as reply-to. If the Resend variables are missing, the form shows a friendly error and logs the reason on the server.

The rate limit is held in memory, so it applies per server instance.

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards
- Generated share images (`opengraph-image.tsx`) for the site and each service
- `sitemap.xml` (pages plus published posts) and `robots.txt`
- Structured data: Organization, WebSite, BreadcrumbList, Service, FAQPage, Blog, BlogPosting, AboutPage, ContactPage

After deploying, verify the domain in Google Search Console and submit `https://<your-domain>/sitemap.xml`. Google decides whether to show sitelinks under a result; clear navigation, breadcrumbs and descriptive page titles make them more likely.

## Security

- Security headers on every response (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame protection)
- A separate, scoped Content Security Policy for the Studio
- `/studio` and `/api/*` are excluded from search engines
- Remote images limited to Unsplash and your own Sanity project
- Blog links are restricted to `http`, `https`, `mailto` and `tel`

## Instant updates (webhook)

Pages are cached and refreshed when Sanity notifies the site. In **API → Webhooks**, create a webhook:

- URL: `https://<your-domain>/api/revalidate`
- Trigger on: create, update, delete
- Filter: `_type in ["post", "author", "category"]`
- Projection: `{_type, "slug": slug.current}`
- Secret: the value of `SANITY_REVALIDATE_SECRET`

Without `SANITY_REVALIDATE_SECRET`, pages refresh every 60 seconds instead.

## Draft previews

With `SANITY_API_READ_TOKEN` set, open the **Presentation** tool in the Studio to preview unpublished changes on the live site, with click-to-edit overlays.
