# ApostropheCMS Demo

A feature-rich reference project built on the [essentials starter kit](https://github.com/apostrophecms/starter-kit-essentials).
Use it to explore ApostropheCMS 4 capabilities — articles, i18n, CMS-editable design tokens,
relationship fields, and a full widget library — or as a reference when building your own project.

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
# Edit .env — set APOS_DB_URI at minimum (see Environment Variables below)
npm install
node app @apostrophecms/user:add admin admin
npm run dev
```

Open **http://localhost:3000** and log in at `/login` with username `admin` and the password
you entered above.

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
  │  data.global (incl. styles tokens), data.home, data.user attached
  ▼
Nunjucks render
  views/layout.html                          ← site chrome
    └─ modules/<page-type>/views/page.html  ← page content
         └─ {% area %} tags
              └─ modules/<widget-name>/views/widget.html
  ▼
HTML response
```

**Key directories**

| Path | Purpose |
|------|---------|
| `app.js` | Entry point; all module registration |
| `modules/` | One subdirectory per module |
| `lib/` | Shared field config (area, link, options, icons) |
| `views/` | Site-wide Nunjucks templates and macros |
| `modules/asset/ui/src/` | Client-side JS and SCSS |
| `modules/@apostrophecms/styles/` | CMS-editable design tokens |
| `modules/helper/` | Server-side Nunjucks helpers |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for conventions, template inheritance details,
the full `data.*` reference, and helper documentation.

---

## Adding a Widget

**1.** Create `modules/<widget-name>/index.js`:

```js
import link from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: { label: 'project:myWidget' },
  fields: {
    add: {
      heading: { type: 'string', label: 'project:heading' },
      ...link.link
    }
  }
};
```

**2.** Create `modules/<widget-name>/views/widget.html`:

```html
{% import 'link.html' as link %}
{% set widget = data.widget %}
<div>
  <h2>{{ widget.heading }}</h2>
  {{ link.render({ label: widget.linkText, path: apos.helper.linkPath(widget), target: widget.linkTarget }) }}
</div>
```

**3.** Register in `app.js` under `modules`: `'<widget-name>': {}`

**4.** Add `'<widget-name>': {}` to an area's `widgets` config, or to `lib/area.js`.

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

**2.** Create `modules/<page-name>/views/page.html`:

```html
{% extends "layout.html" %}
{% block main %}
  <h1>{{ data.page.title }}</h1>
  {% area data.page, 'main' %}
{% endblock %}
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
| `APOS_DB_URI` | **Yes** | Database connection string (see formats below) |
| `APOS_DEV` | No | Set to `1` to force admin UI rebuild on every restart |

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

- [ ] Set a unique session `secret` in `modules/@apostrophecms/express/index.js`
- [ ] Set `baseUrl` in `app.js` to your production domain
- [ ] Run `npm run build` to compile production assets
- [ ] Start with `npm run serve` (or `npm run release` to install, build, and migrate in one step)

---

## Resources

- [ApostropheCMS Documentation](https://docs.apostrophecms.org)
- [ApostropheCMS Discord](https://chat.apostrophecms.com)
- [GitHub Discussions](https://github.com/apostrophecms/apostrophe/discussions)
- [Essentials Starter Kit](https://github.com/apostrophecms/starter-kit-essentials)
- [ARCHITECTURE.md](./ARCHITECTURE.md) — conventions, template reference, data sources
