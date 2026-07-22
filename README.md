# JDHomecillo — Personal Portfolio

A minimalist, neo-brutalist portfolio. Content is hardcoded in `data/portfolio.json` — edit that file and redeploy to update the site.

---

## Stack

- **Next.js 16** (App Router, static export → GitHub Pages)
- **TypeScript**
- **Tailwind CSS 3** with a custom neo-brutalist design system (squared corners, hard offset shadows, paper-beige background, teal/magenta/yellow accents)
- **Material Symbols Outlined** — icon system

---

## Features

- Content from `data/portfolio.json` — no CMS, no backend
- Sections: Hero, Skills, Projects, Experience, Certificates, Links, Contact
- Sidebar Changelog button — modal listing the version history (`lib/changelog.ts`)
- Current version badge next to the nav brand, read straight from `package.json`
- Scroll-reveal animations
- Responsive — desktop sidebar nav, mobile top + bottom nav
- `prefers-reduced-motion` support

---

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production static export → ./out
npm run lint     # ESLint
```

---

## Deploy

Push to `main` triggers GitHub Actions → builds → deploys to GitHub Pages.

---

## Content Management

Edit `data/portfolio.json` directly:

- **personalInfo** — name, tagline, bio, location, links, profile photo URL
- **skills** — icon, color, description
- **projects** — size (grid layout), tags, link, description, image URL
- **experience** — role, company, period, description
- **certificates** — name, issuer, date, link, optional `image` (filename under `public/certificates/`)
- **accountLinks** — social/platform handles and URLs

To add a certificate image, drop the file in `public/certificates/` and reference its filename in the certificate's `image` field.

---

## Versioning

Tagged with [Semantic Versioning](https://semver.org). `main` is auto-released by `.github/workflows/release.yml`: on every push, it parses [Conventional Commit](https://www.conventionalcommits.org) messages since the last tag (`fix:` → patch, `feat:` → minor, `BREAKING CHANGE` → major), bumps `package.json`, tags the commit, and publishes a GitHub Release.

| Tag | Era |
|---|---|
| `v1.0.0` | Static HTML/Bootstrap site, Firestore-backed blog, ParaNawen companion app attempt |
| `v2.0.0` | Next.js side-scrolling pixel-art game portfolio |
| `v3.0.0` | Nexus dark glassmorphism CMS portfolio |
| `v4.0.0` | Neo-brutalist "on paper" redesign |
| `v4.1.0` | Certificates section, de-gamified UI, jdhomecillo rebrand |

> Tags off `main` (e.g. milestones on `develop`) intentionally skip the `v*` prefix (e.g. `dev-v4.1.0`) — the release action picks the globally-highest `v*` tag with no branch-ancestry check, so a `v*`-prefixed tag anywhere in the repo can corrupt `main`'s computed version.

---

## Built With AI

This project was developed with the assistance of:

- **[Claude](https://claude.ai) by Anthropic** — architecture, implementation, and iteration via Claude Code
- **[Google Stitch](https://stitch.withgoogle.com)** — UI prototyping and design generation
