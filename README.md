# ApostropheCMS Demo

A feature-rich reference project built on the [essentials starter kit](https://github.com/apostrophecms/starter-kit-essentials).
Use it to explore ApostropheCMS 4 capabilities — articles, i18n, CMS-editable design tokens,
relationship fields, and a full widget library — or as a reference when building your own project.

Templates are written in server-side **JSX**. There is no React and no client-side runtime; JSX is
an alternative to Nunjucks that runs on the server. See [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Prerequisites

| Requirement | Version | Link |
|-------------|---------|------|
| Node.js | 22 LTS+ | https://nodejs.org |
| npm | 8+ | Included with Node.js |
| Git | Any recent | https://git-scm.com |
| Database | — | SQLite (no server), MongoDB 8+, or PostgreSQL 14+ |

> **Quickest local setup:** choose SQLite. No database server is required.

---

## Quick Start

Create a project with the guided installer:

```sh
npm create apostrophe@latest
```

Answer the prompts as follows. Two of the defaults install something else, so check those two
answers carefully:

1. **Project name** — anything; this becomes the project folder.
2. **How would you like to build?** → **Apostrophe Standalone** (the default is Astro).
3. **Choose a starting point** → **Demo**
4. **Pre-fill with sample content?** → **Yes** (the default is No).
5. **Choose a database** → **SQLite**, unless you already run MongoDB or PostgreSQL.
6. **Create your admin account** — pick a username and password.

The installer clones this repository, writes `.env`, installs dependencies, imports the sample
content, and creates your admin account. Then:

```sh
cd <your-project-name>
npm run dev
```

Open **http://localhost:3000** and log in at `/login` with the admin account you just created.
(If port 3000 is already in use on your machine, set `PORT` in `.env` — see
[Environment Variables](#environment-variables) — and open that port instead.)

To install without prompts, for example in CI, pass `--kit=apostrophe-demo-data`. Without it,
unattended mode installs the Astro demo:

```sh
npm create apostrophe@latest -- --unattended --kit=apostrophe-demo-data \
  --project-name=my-site --password=<admin-password> --telemetry=off
```

Run `npm create apostrophe@latest -- --help` for all flags.

### Working on this repository

To contribute to the demo itself, clone it directly. This path starts with an empty database
and no sample content.

```sh
git clone https://github.com/apostrophecms/public-demo.git
cd public-demo
cp .env.example .env
# Edit .env — set APOS_DB_URI unless MongoDB is running locally, e.g.
# APOS_DB_URI=sqlite://./data/public-demo.db (see Environment Variables below)
npm install
node app @apostrophecms/user:add admin admin
npm run dev
```

---

## Architecture Overview

```
Browser
  │  HTTP request
  ▼
Express  (app.js)
  │  Route matched by @apostrophecms/page
  ▼
Page module  modules/<page-type>/index.js
  │  Relationship fields joined (_field arrays populated)
  │  data.global, data.home, data.user attached
  ▼
JSX render (server-side)
  outerLayout.html                          ← Nunjucks, from core; <head> and <body>
    └─ views/layout.jsx                     ← site chrome (header, nav, footer)
         └─ modules/<page-type>/views/page.jsx  ← page content
              └─ <Area> components
                   └─ modules/<widget-name>/views/widget.jsx
  ▼
HTML response
```

**Key directories**

| Path | Purpose |
|------|---------|
| `app.js` | Entry point; all module registration |
| `modules/` | One subdirectory per module |
| `lib/` | Shared field config (areas, links, icon choices) |
| `views/` | Site-wide JSX templates (layout, link, locale switcher) |
| `modules/asset/ui/src/` | Client-side JS and SCSS |
| `modules/@apostrophecms/styles/` | CMS-editable design tokens |
| `modules/helper/` | Shared template logic, called as `apos.helper.*` |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for conventions, template inheritance details,
the full data reference, and helper documentation.

---

## Adding a Widget

**1.** Create `modules/<widget-name>/index.js`:

```js
import linkConfig from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: { label: 'project:myWidget' },
  fields: {
    add: {
      heading: { type: 'string', label: 'project:heading' },
      ...linkConfig.link
    }
  }
};
```

**2.** Create `modules/<widget-name>/views/widget.jsx`:

```jsx
export default function ({ widget }, { Template, apos }) {
  return (
    <div className="widget my-widget">
      <h2>{widget.heading}</h2>
      <Template
        templateName="link.jsx"
        label={widget.linkText}
        path={apos.helper.linkPath(widget)}
        target={widget.linkTarget}
      />
    </div>
  );
}
```

**3.** Register in `app.js` under `modules`: `'<widget-name>': {}`

**4.** Add the widget to an area's `widgets` config, or to `lib/area.js`. The key drops the
`-widget` suffix: `'my': {}` for `my-widget`.

**5.** Add translation keys to `modules/@apostrophecms/i18n/i18n/project/en.json` (and other locales).

---

## Adding a Page Type

**1.** Create `modules/<page-name>/index.js`:

```js
import { fullConfig } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/page-type',
  options: { label: 'project:myPage' },
  fields: {
    add: {
      main: { type: 'area', options: { widgets: fullConfig } }
    }
  }
};
```

**2.** Create `modules/<page-name>/views/page.jsx`:

```jsx
export default function ({ page }, { Extend, Area }) {
  return (
    <Extend
      templateName="layout.jsx"
      main={<Area doc={page} name="main" />}
    />
  );
}
```

**3.** Register in `app.js` under `modules`: `'<page-name>': {}`

**4.** Add to `modules/@apostrophecms/page/index.js` → `options.types`:

```js
{ name: '<page-name>', label: 'project:myPage' }
```

---

## Environment Variables

Copy `.env.example` to `.env`. Never commit `.env`.

| Variable | Required | Description |
|----------|----------|-------------|
| `APOS_DB_URI` | Unless using local MongoDB | Database connection string (see formats below) |
| `APOS_SESSION_SECRET` | **Yes, in production** | Long random string used to sign session cookies |
| `GITHUB_TOKEN` | No | Raises the GitHub API rate limit for the GitHub Pull Requests widget |
| `APOS_DEV` | No | Set to `1` to rebuild the admin UI on every restart |
| `PORT` | No | Port the server listens on. Defaults to `3000` — if that's already taken on your machine, set `PORT` instead |
| `APOS_BASE_URL` | **Yes, in production** | Has no default. Without it, absolute URLs are computed per request from what the browser asked for, which is fine for normal page views but not for work that happens outside a request — like sitemap generation — which needs an explicit base URL to build absolute links from. Set it to your production domain, e.g. `https://example.com` |

**`APOS_DB_URI` formats:**

```
# MongoDB
mongodb://localhost:27017/public-demo

# SQLite (no server needed — good for local dev)
sqlite://./data/public-demo.db

# PostgreSQL (use underscores, not hyphens, in database name)
postgres://user:password@localhost:5432/public_demo
```

---

## Before Going to Production

- [ ] Set `APOS_SESSION_SECRET` in the production environment
- [ ] Set `APOS_BASE_URL` in the production environment to your production domain
- [ ] Run `npm run build` to compile production assets
- [ ] Run `npm run migrate`, then start with `npm run serve`

---

## Resources

- [ApostropheCMS Documentation](https://docs.apostrophecms.org)
- [ApostropheCMS Discord](https://chat.apostrophecms.com)
- [GitHub Discussions](https://github.com/apostrophecms/apostrophe/discussions)
- [Essentials Starter Kit](https://github.com/apostrophecms/starter-kit-essentials)
- [ARCHITECTURE.md](./ARCHITECTURE.md) — conventions, template reference, data sources
