# CLAUDE.md — public-demo

Machine-readable project brief for AI coding assistants. Facts and conventions only.

---

## Architecture

ApostropheCMS 4 demo project built on the essentials starter, using ES modules (`"type": "module"`).
Modules live in `modules/`, shared field config in `lib/`, Nunjucks templates in `views/` and
`modules/*/views/`. Asset pipeline uses `@apostrophecms/vite`; client-side source is in
`modules/asset/ui/src/`. Supports i18n (en, fr, de, es) and CMS-editable design tokens via
`modules/@apostrophecms/styles/`.

## Dev Commands

```
npm run dev      # start with nodemon (watches modules/, lib/, views/)
npm start        # start without watch
npm run build    # production asset build
npm run serve    # production server
```

## Adding a Widget

1. Create `modules/<widget-name>/index.js` — extend `@apostrophecms/widget-type`
2. Create `modules/<widget-name>/views/widget.html` — Nunjucks template
3. Register in `app.js` under `modules`: `'<widget-name>': {}`
4. Add to an area's `widgets` config (inline or via `lib/area.js`)

Example module path: `modules/card-widget/index.js`
Example template path: `modules/card-widget/views/widget.html`

## Adding a Page Type

1. Create `modules/<page-name>/index.js` — extend `@apostrophecms/page-type`
2. Create `modules/<page-name>/views/page.html` — Nunjucks template
3. Register in `app.js` under `modules`: `'<page-name>': {}`
4. Add to `modules/@apostrophecms/page/index.js` → `options.types` array

Example module path: `modules/default-page/index.js`
Example template path: `modules/default-page/views/page.html`

## `_` Prefix Convention

Relationship fields are prefixed with `_` (e.g., `_linkPage`, `_author`, `_categories`).
- Value is always an **array**, even with `max: 1`
- Not stored in the document — joined at query time
- Access single results via `doc._field[0]`

## Shared Field Utilities (`lib/`)

| File | Exports | Use for |
|------|---------|---------|
| `lib/area.js` | `basicConfig`, `fullConfig`, `fullConfigExpandedGroups` | Area field `widgets` option |
| `lib/link.js` | `link` field group | Spread into `fields.add` for linkType + `_linkPage` + `_linkFile` + `linkUrl` |
| `lib/options.js` | `aposBrandColors` | Shared color choices for select fields |
| `lib/iconChoices.js` | Array of `{ label, value }` | Icon picker select choices |

Import instead of duplicating config inline:
```js
import { fullConfig } from '../../lib/area.js';
import link from '../../lib/link.js';
```

## i18n Key Convention

All project translation strings use the `project:` namespace.

- Key format: `'project:camelCaseKey'` (e.g., `'project:linkText'`)
- Translation files: `modules/@apostrophecms/i18n/i18n/project/<locale>.json`
- Register namespace: `modules/@apostrophecms/i18n/index.js` → `i18n: { project: { browser: true } }`
- Supported locales: `en`, `fr`, `de`, `es`

## Template Discovery

Apostrophe discovers templates by filename — **no registry required**.

| Template type | Path convention |
|--------------|----------------|
| Widget | `modules/<widget-name>/views/widget.html` |
| Page | `modules/<page-type>/views/page.html` |
| Piece index | `modules/<piece-page>/views/index.html` |
| Piece show | `modules/<piece-page>/views/show.html` |

## Data Sources in Templates

| Variable | Contents | Notes |
|----------|----------|-------|
| `data.widget` | Widget document | Widget templates only |
| `data.page` | Current page document | All page templates |
| `data.piece` | Current piece document | Piece-type page templates only |
| `data.global` | Global settings + styles tokens | Requires `@apostrophecms/global` |
| `data.user` | Authenticated user or `null` | All templates |
| `data.home` | Home page document | All templates |
| `data.query` | Query string as object | All templates |
| `data.localizations` | Available locales with flag + url | All templates |

## Server-Side Helpers (`modules/helper/`)

`modules/helper/index.js` is aliased as `helper` and registers Nunjucks helpers.

- `apos.helper.linkPath(link)` — canonical link resolver; accepts a widget or field group using the `lib/link.js` pattern; returns a URL string
- `apos.helper.formatDate(date)` — formats a date as `"Month D, YYYY"`

## Shared Nunjucks Macros (`views/link.html`)

`views/link.html` exposes a `render` macro for anchor tags. Import at the top of any template:

```html
{% import 'link.html' as link %}
{{ link.render({ label: widget.linkText, path: apos.helper.linkPath(widget), target: widget.linkTarget, class: 'button' }) }}
```

## Template Inheritance

```
outerLayoutBase.html  ← ApostropheCMS core (never edit)
  outerLayout.html    ← override in modules/@apostrophecms/template/views/ for <head>/meta
    views/layout.html ← edit for site chrome (header, nav, footer)
      modules/<page-type>/views/page.html ← edit for page content
```

`views/layout.html` opens with `{% extends data.outerLayout %}`.
