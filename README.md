# JDHomecillo

My personal portfolio, live at [hmcldryl.github.io](https://hmcldryl.github.io).

It's a static Next.js site with a neo-brutalist look: paper background, square corners, hard shadows, and teal, magenta and yellow accents. There's no CMS or backend. All the content sits in `data/portfolio.json`, so updating the site means editing that file and pushing.

## Running it

```bash
npm install
npm run dev      # localhost:3000
npm run build    # static export to ./out
npm run lint
```

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 3. Icons are Material Symbols.

## Editing content

Everything is in `data/portfolio.json`:

| Key | What it holds |
|---|---|
| `personalInfo` | Name, tagline, bio, location, links, profile photo |
| `skills` | Name, icon, color, description |
| `projects` | Name, description, tags, link, accent color, and `size` for the grid layout |
| `experience` | Role, company, period, description, icon, color |
| `certificates` | Name, issuer, date, link, optional `image` |
| `accountLinks` | Platform, handle, URL, icon, color |

Certificates and Links disappear from the page and the nav when their lists are empty.

For a certificate image, put the file in `public/certificates/` and use its filename as `image`.

## Branches and deploys

`main` is production and the only long-lived branch. Work goes on `feat/`, `fix/` and similar branches and merges straight into `main`.

Every push to `main` runs the Release workflow, and the site deploys to GitHub Pages once that finishes. The deploy waits so the version badge in the header matches the new release.

## Versioning

Release reads the [Conventional Commit](https://www.conventionalcommits.org) messages since the last tag. `fix:` bumps the patch version, `feat:` bumps the minor, and `BREAKING CHANGE` bumps the major. It then updates `package.json`, tags the commit and publishes a GitHub Release. Other prefixes like `chore:` and `docs:` don't trigger a release.

Don't put a `v*` tag on a commit outside `main`. The release action takes the highest `v*` tag in the whole repo without checking which branch it's on, so a stray tag throws off the next version.

The changelog in the site's modal is written by hand in `lib/changelog.ts`. Keep it in step with this table:

| Tag | What it was |
|---|---|
| `v1.0.0` | Plain HTML and Bootstrap site with a Firestore blog, plus an attempt at a ParaNawen companion app |
| `v2.0.0` | Side-scrolling pixel-art game portfolio in Next.js |
| `v3.0.0` | Nexus, a dark glassmorphism portfolio with a CMS |
| `v4.0.0` | Neo-brutalist "on paper" redesign |
| `v4.1.0` | Certificates section, removed the game-style UI, rebranded to JDHomecillo |
| `v4.1.1` | Version badge and changelog modal |
| `v4.2.0` | New projects, UI and accessibility fixes, removed the CMS and old game assets |
