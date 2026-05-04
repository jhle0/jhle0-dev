# Codex Project Brief: jhle0-dev

Last reviewed: 2026-05-04

This document is a quick handoff note for future Codex sessions working on `jhle0/jhle0-dev`.

## What This Project Is

`jhle0-dev` is a personal developer blog for study notes, project writeups, and learning logs.

The public site is configured around:

- Site name/brand: `jhle0`
- Production URL: `https://jhle0-dev.vercel.app`
- Main theme: a personal CS/AI developer archive
- Core content: CS fundamentals, AI learning, project notes, retrospectives, and build logs

The app is built with Astro and deployed on Vercel.

## Tech Stack

- Framework: Astro
- Package type: ESM (`"type": "module"`)
- Required Node version: `>=22.12.0`
- Markdown features: GFM, math, KaTeX rendering
- CMS: Decap CMS under `/admin`
- Deployment target: Vercel

Important package scripts:

```sh
npm install
npm run dev
npm run build
npm run preview
npm run cms:proxy
```

For local Decap CMS editing, run the Astro dev server and `npm run cms:proxy` in a separate terminal.

## Important Paths

- `src/content/blog`: Markdown blog posts
- `src/content/projects`: Markdown project entries
- `src/content.config.ts`: Astro content collection schemas
- `src/pages/index.astro`: Home page
- `src/pages/blog/index.astro`: Blog archive with filters/search/sort
- `src/pages/projects/index.astro`: Project archive
- `src/layouts/BaseLayout.astro`: Global layout, SEO, nav, theme toggle, locale switcher
- `src/lib/blog.ts`: Blog topic constants, labels, and descriptions
- `src/lib/series.ts`: Series grouping/sorting helpers
- `src/lib/i18n.ts`: Korean/English locale helpers and UI labels
- `src/styles/global.css`: Global styling
- `public/admin/config.yml`: Decap CMS configuration
- `public/images/uploads`: CMS-uploaded images
- `docs`: Project documentation
- `cms-auth/cloudflare-worker`: Cloudflare Worker OAuth proxy scaffold for Decap CMS auth

## Content Model

Blog posts are Astro content collection entries loaded from `src/content/blog/**/*.md`.

Required blog frontmatter:

- `title`
- `description`
- `pubDate`
- `slug`
- `topic`
- `tags`

Optional blog frontmatter:

- `updatedDate`
- `draft`
- `heroImage`
- `series`
- `seriesOrder`
- `featured`
- `canonicalURL`

Valid blog topics are:

- `study`
- `development`
- `retrospective`
- `projects`
- `thoughts`

Project entries are loaded from `src/content/projects/**/*.md`.

Required project frontmatter:

- `title`
- `description`
- `pubDate`
- `slug`
- `tags`

Optional project frontmatter:

- `updatedDate`
- `draft`
- `heroImage`
- `status`
- `githubUrl`
- `demoUrl`

Valid project status values are:

- `planned`
- `in-progress`
- `completed`

## Existing Features

- Home page showing recent posts and recent projects
- Blog archive page
- Topic filter buttons
- Tag checkbox filters
- Text search over title/description/tags/topic
- Ascending/descending date sort
- Query string sync for blog filters (`q`, `topic`, `tags`, `sort`)
- Series support for blog posts
- Series summaries and series ordering through `series` and `seriesOrder`
- Project archive with cards, optional hero images, status labels, GitHub links, and demo links
- Decap CMS admin under `/admin`
- GitHub-backed Decap CMS configuration
- Local Decap backend support through `decap-server`
- Cloudflare Worker OAuth proxy scaffold for deployed CMS auth
- Light/dark theme toggle persisted with `localStorage`
- Korean/English locale helpers with `/en` routing convention
- SEO metadata in `BaseLayout.astro`
- Canonical URLs and Open Graph/Twitter metadata
- RSS link in the layout
- `robots.txt` route pointing to sitemap
- KaTeX math support for Markdown

## Design/UX Direction

The site reads as a quiet personal developer archive rather than a marketing site.

Current visual/interaction patterns:

- Dense but readable archive layout
- `surface-card` for cards/panels
- `section-block`, `section-heading`, `page-intro`, `intro-copy` for page structure
- Tag chips and topic pills for filtering/navigation
- Home hero centered around CS/AI personal archive identity
- Navigation includes Home, About, Now, Blog, Projects, Contact
- Footer includes Blog, Projects, RSS, and GitHub links

When adding new UI, prefer fitting into the existing archive/productivity style over adding a separate landing-page style.

## Decap CMS Notes

`public/admin/config.yml` is configured for:

- Backend: GitHub
- Repo: `jhle0/jhle0-dev`
- Branch: `main`
- Site domain: `jhle0-dev.vercel.app`
- Media folder: `public/images/uploads`
- Public image path: `/images/uploads`
- Publish mode: `simple`
- Locale: `ko`

The deployed `/admin` uses an OAuth proxy endpoint:

- `base_url: https://jhle0-dev-cms-auth.dumiso04.workers.dev`
- `auth_endpoint: auth`

Local CMS editing depends on:

```sh
npm run cms:proxy
```

## SEO/Site Notes

`astro.config.mjs` sets the site URL from `SITE_URL`, falling back to `https://jhle0-dev.vercel.app`.

Markdown uses:

- `remark-gfm`
- `remark-math`
- `rehype-katex`

`BaseLayout.astro` handles:

- Page title and description
- Canonical URL
- RSS alternate link
- Open Graph metadata
- Twitter card metadata
- `hreflang` alternates for `ko`, `en`, and `x-default`
- Optional article published/modified times
- Optional `noindex`

## Suggested Workflow For Future Codex Sessions

1. Read this file first.
2. Inspect the specific page/content path relevant to the task.
3. Preserve the existing Astro/content collection patterns.
4. For content edits, validate frontmatter against `src/content.config.ts`.
5. For UI edits, check `BaseLayout.astro`, the relevant page, and `src/styles/global.css` together.
6. For blog archive behavior, be careful with the inline client script in `src/pages/blog/index.astro` because it manages filters, sorting, and URL state.
7. For series behavior, check `src/lib/series.ts` before changing series routes or ordering.
8. For CMS changes, keep `public/admin/config.yml` and `src/content.config.ts` aligned.
9. Run `npm run build` before merging when a runnable environment is available.

## Known Caveat From This Review

In the current Codex environment on 2026-05-04, direct `git clone` into the shared Windows workspace failed due to local permission restrictions. The repository was still accessible through the GitHub connector, so future sessions can use GitHub file access even if local clone is blocked.
