# ApostropheCMS Standalone Starter

A ready-to-extend starting point for building content-managed websites with ApostropheCMS. The CMS, content API, and frontend are one Node.js process — no separate frontend server, no build pipeline to configure before you can write your first template. Clone it, run it, and start adding your own page types and widgets within minutes.

---

## Prerequisites

| Dependency | Version | Notes |
|------------|---------|-------|
| Node.js | 22 or later (current LTS) | [nodejs.org](https://nodejs.org) |
| Database | — | SQLite by default (no server required). MongoDB 6.0+ and PostgreSQL 14+ are also supported. |

No database server is needed to get started — SQLite is the default and creates its file automatically on first run. Set `APOS_DB_URI` to a `mongodb://` or `postgres://` URI to switch backends; no code changes required.

---

## Quick Start

```bash
# 1. Clone and enter the project
git clone https://github.com/apostrophecms/public-demo.git my-project
cd my-project

# 2. Install dependencies
npm install

# 3. (Optional) To switch databases, edit .env and set APOS_DB_URI.
#    SQLite is used by default — no change needed to run locally.

# 4. Create your admin user
node app @apostrophecms/user:add admin admin

# 5. Start the development server
npm run dev
```

Visit **http://localhost:3000/login** to log in and start editing.

---

## Architecture Overview

```
my-project/
├── app.js              Entry point — registers all modules with Apostrophe
├── lib/                Shared field configs imported by multiple modules
│   ├── area.js         Pre-built widget lists for area fields
│   ├── link.js         Canonical link field set (page / file / custom URL)
│   └── iconChoices.js  Shared icon choice arrays
├── modules/            One directory per CMS module
│   ├── @apostrophecms/ Core module overrides (global settings, page types, styles)
│   ├── article/        Article piece type
│   ├── hero-widget/    Example widget
│   └── ...             Additional widgets and page types
├── public/             Static assets served directly (fonts, images, JS)
└── views/              Project-level templates
    ├── layout.html     Site shell — header, nav, footer
    └── link.html       Shared Nunjucks macros
```

**How a page request flows through the system:**

1. The browser requests a URL.
2. ApostropheCMS matches the URL to a page document in the database.
3. Apostrophe fetches the page document and resolves all relationship fields (`_image`, `_author`, etc.) in a single pass.
4. The matching page template (`modules/{page-type}/views/page.html`) renders, extending `views/layout.html`.
5. Each `{% area %}` tag renders its widgets in sequence; each widget runs its own template.
6. The fully assembled HTML is sent to the browser.

For a deeper walkthrough of every pattern in this codebase, see the **[Standalone Architecture Guide](https://docs.apostrophecms.org/guide/standalone-architecture.html?utm_source=standalone-starter&utm_medium=readme&utm_campaign=architecture-guide)**.

---

## How to Extend

### Adding a widget

1. Create `modules/my-widget/index.js` — set `extend`, `options.label`, and `fields.add`.
2. Create `modules/my-widget/views/widget.html` (Nunjucks) or `widget.jsx` (JSX).
3. Register in `app.js`: add `'my-widget': {}` to the `modules` object.
4. Add `'my-widget'` to the relevant area config in `lib/area.js` or inline in a module schema.

### Adding a page type

1. Create `modules/my-page/index.js` — set `extend: '@apostrophecms/page-type'` and `fields.add`.
2. Create `modules/my-page/views/page.html` (Nunjucks) or `page.jsx` (JSX).
3. Register in `app.js`: add `'my-page': {}` to the `modules` object.
4. Add it to the `types` array in `modules/@apostrophecms/page/index.js` so editors can select it.

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `APOS_DB_URI` | No (defaults to SQLite) | SQLite file in `./data/` | Database connection URI. Set in `.env`. Accepts `sqlite://`, `mongodb://`, or `postgres://` — Apostrophe selects the right adapter automatically. |
| `APOS_BASE_URL` | Yes in production | `http://localhost:3000` | The public URL of the site. Used for absolute URL generation and redirects. |
| `NODE_ENV` | Yes in production | unset | Set to `production` to enable production behaviour (error handling, security headers). |

---

## Deployment

**ApostropheCMS Hosting** is the simplest path to production — managed infrastructure with built-in asset handling, database backups, and zero-downtime deploys. See [apostrophecms.com/hosting](https://apostrophecms.com/hosting).

**Self-hosted:** run `NODE_ENV=production node app` behind a reverse proxy (nginx or similar). Set `APOS_BASE_URL` and `APOS_DB_URI` in your environment. SQLite is fine for small single-server deployments; use MongoDB or PostgreSQL for anything that requires replication or multiple app instances. Run `node app @apostrophecms/asset:build` as part of your deploy step to compile frontend assets before restarting the server.

---

## Resources

- [ApostropheCMS Documentation](https://docs.apostrophecms.org)
- [Standalone Architecture Guide](https://docs.apostrophecms.org/guide/standalone-architecture.html?utm_source=standalone-starter&utm_medium=readme&utm_campaign=architecture-guide)
- [ApostropheCMS Extensions](https://apostrophecms.com/extensions)
- [Community Discord](https://discord.com/invite/HwntQpADJr)
