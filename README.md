# JDHomecillo — Personal Portfolio

A minimalist, neo-brutalist portfolio built as a CMS-driven website. Firebase Firestore powers all content in real-time — update from `/profile` and the live site reflects changes instantly.

---

## Stack

- **Next.js 16** (App Router, static export → GitHub Pages)
- **TypeScript**
- **Tailwind CSS 3** with a custom neo-brutalist design system (squared corners, hard offset shadows, paper-beige background, teal/magenta/yellow accents)
- **Firebase Auth + Firestore** — authentication and real-time content
- **Cloudinary** — profile photo uploads (unsigned preset, works on static sites)
- **Material Symbols Outlined** — icon system

---

## Features

- Dynamic content from Firestore — no hardcoded portfolio data
- `/profile` CMS dashboard — edit every section, upload profile photo, reorder items
- Sections: Hero, Skills, Projects, Experience, Certificates, Links, Contact
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

## Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

---

## Deploy

Push to `main` triggers GitHub Actions → builds → deploys to GitHub Pages. All env vars are stored as repository secrets.

---

## Content Management

Go to `/login` → authenticate → `/profile` to manage:

- **Personal Info** — name, tagline, bio, location, links, profile photo
- **Skills** — icon, description
- **Projects** — size (grid layout), tags, link, description
- **Experience** — roles, company, period, description
- **Certificates** — name, issuer, date, link
- **Links** — social/platform handles and URLs

---

## Versioning

Tagged with [Semantic Versioning](https://semver.org). `main` is auto-released by `.github/workflows/release.yml`: on every push, it parses [Conventional Commit](https://www.conventionalcommits.org) messages since the last tag (`fix:` → patch, `feat:` → minor, `BREAKING CHANGE` → major), bumps `package.json`, tags the commit, and publishes a GitHub Release.

| Tag | Era |
|---|---|
| `v1.0.0` | Static HTML/Bootstrap site, Firestore-backed blog, ParaNawen companion app attempt |
| `v2.0.0` | Next.js side-scrolling pixel-art game portfolio |
| `v3.0.0` | Nexus dark glassmorphism CMS portfolio |
| `v4.0.0` | Neo-brutalist "on paper" redesign |

> Tags off `main` (e.g. milestones on `develop`) intentionally skip the `v*` prefix (e.g. `dev-v4.1.0`) — the release action picks the globally-highest `v*` tag with no branch-ancestry check, so a `v*`-prefixed tag anywhere in the repo can corrupt `main`'s computed version.

---

## Built With AI

This project was developed with the assistance of:

- **[Claude](https://claude.ai) by Anthropic** — architecture, implementation, and iteration via Claude Code
- **[Google Stitch](https://stitch.withgoogle.com)** — UI prototyping and design generation
