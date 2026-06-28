# Nexus // JDH — Personal Portfolio

A dark, interactive portfolio built as a CMS-driven website. Firebase Firestore powers all content in real-time — update from `/profile` and the live site reflects changes instantly.

---

## Stack

- **Next.js 15** (App Router, static export → GitHub Pages)
- **TypeScript**
- **Tailwind CSS 3** with custom Nexus design tokens
- **Firebase Auth + Firestore** — authentication and real-time content
- **Cloudinary** — profile photo and project image uploads (unsigned preset, works on static sites)
- **Material Symbols Outlined** — icon system

---

## Features

- Dynamic content from Firestore — no hardcoded portfolio data
- `/profile` CMS dashboard — edit all sections, upload images, reorder items
- Sections: Hero, Technical Arsenal (skills), Quest Log (projects), Experience, Accounts, Connect
- Quest Log cards support full-bleed background images with zoom-on-hover
- Scroll-reveal animations, staggered hero entry, floating background orbs
- Sidebar XP bar — dynamic level and progress based on birthday countdown
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
- **Arsenal** — skills with level, icon, description
- **Quest Log** — projects with size, tags, image, link
- **Experience** — roles, company, period, description
- **Accounts** — gaming/social platform links and handles

---

## Built With AI

This project was developed with the assistance of:

- **[Claude](https://claude.ai) by Anthropic** — architecture, implementation, and iteration via Claude Code
- **[Google Stitch](https://stitch.withgoogle.com)** — UI prototyping and design generation
