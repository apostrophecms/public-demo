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
| Database | — | MongoDB 8+, SQLite (no server), or PostgreSQL 14+ |
| npm | 8+ | Included with Node.js |

> **Quickest local setup:** use SQLite — no database server required.
> Set `APOS_DB_URI=sqlite://./data/public-demo.db` in `.env`.

---

## Quick Start

```sh
git clone https://github.com/apostrophecms/public-demo.git
cd public-demo
cp .env.example .env
# Edit .env — set APOS_DB_URI unless MongoDB is running locally (see Environment Variables below)
npm install
node app @apostrophecms/user:add admin admin
npm run dev
```

Open **http://localhost:3000** and log in at `/login` with username `admin` and the password
you entered above. (If port 3000 is already in use on your machine, set `PORT` and `APOS_BASE_URL`
in `.env` — see [Environment Variables](#environment-variables) — and open that port instead.)

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
| `PORT` | No | Port the server listens on. Defaults to `3000` — if that's already taken on your machine, set `PORT` instead. Doesn't change `baseUrl`; set `APOS_BASE_URL` too if you want links and previews to match |
| `APOS_BASE_URL` | **Yes, in production** | Overrides `baseUrl` (used to build absolute links, previews, and canonical URLs), which otherwise defaults to `http://localhost:3000`. Required for any real deployment, where the public URL has its own domain/https and isn't just `http://localhost:<port>` |

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
