# Architecture

ApostropheCMS 4 demo project built on the essentials starter. This file orients developers
and LLM coding assistants to the project's conventions. It is a reference, not a tutorial.

> **Part B** (hosted Architecture Guide — patterns, advanced topics) will be linked here once published.

---

## `_` Prefix Convention

Relationship fields are always prefixed with `_` (e.g., `_linkPage`, `_author`, `_categories`).
The prefix signals that the value is **not stored in the document** — it is joined at query time.
The value is always an **array**, even when `max: 1` is set; ApostropheCMS uses a consistent API
regardless of cardinality. Access a single-result relationship via `doc._field[0]` in templates.

## `lib/` Utilities

Shared configuration objects live in `lib/` and are imported where needed to avoid duplication.

| File | Exports | Use for |
|------|---------|---------|
| `lib/area.js` | `basicConfig`, `fullConfig`, `fullConfigExpandedGroups` | Area field `widgets` option — choose the config that matches the context |
| `lib/link.js` | `link` (field group object) | Spread into any module's `fields.add` to add a linkType + `_linkPage` + `_linkFile` + `linkUrl` pattern |
| `lib/options.js` | `aposBrandColors` | Shared color choices for select fields |
| `lib/iconChoices.js` | Array of `{ label, value }` | Icon picker select choices |

Import instead of duplicating config inline:
```js
import { fullConfig } from '../../lib/area.js';
import link from '../../lib/link.js';
// then spread: ...link.link into fields.add
```

## i18n — `project:` Key Convention

All project-level translation strings use the `project:` namespace (e.g., `'project:linkText'`).

- **Translation files:** `modules/@apostrophecms/i18n/i18n/project/<locale>.json`
- **Namespace registration:** `modules/@apostrophecms/i18n/index.js` → `i18n: { project: { browser: true } }`
- Keys are camelCase, matching the JSON property names in the locale files.
- Supported locales: `en`, `fr`, `de`, `es` (defined in `modules/@apostrophecms/i18n/index.js`).

## Styles Module

CMS-editable design tokens (colors, fonts, spacing) live in `modules/@apostrophecms/styles/`.
Fields are defined per-concern in `modules/@apostrophecms/styles/lib/*.js` (one file per token
group: `color.js`, `font.js`, `spacing.js`, etc.) and composed in `index.js` under `styles.add`
and `styles.group`. Templates read these values from `data.global`.

## Shared Nunjucks Macros

`views/link.html` contains the `render` macro for rendering anchor tags. Import it at the top
of any template that needs links:

```html
{% import 'link.html' as link %}
{{ link.render({ label: 'Click me', path: path, target: widget.linkTarget, class: 'button' }) }}
```

## Server-Side Helpers (`modules/helper/`)

`modules/helper/index.js` (aliased as `helper`) registers Nunjucks helpers via `self.addHelpers()`.

| Helper | Signature | Returns |
|--------|-----------|---------|
| `apos.helper.linkPath(link)` | `link` — a widget or field group using the `lib/link.js` pattern | Resolved URL string |
| `apos.helper.formatDate(date)` | `date` — a JS Date or ISO string | `"Month D, YYYY"` |

Use `apos.helper.linkPath()` as the canonical way to resolve link fields in templates.

## Template Discovery

ApostropheCMS discovers templates by **filename convention** — no registration required:

- Widget template → `modules/<widget-name>/views/widget.html`
- Page template → `modules/<page-type>/views/page.html`
- Piece index/show → `modules/<piece-page>/views/index.html` and `show.html`

Naming the file correctly is sufficient; Apostrophe picks it up automatically.

## Template Inheritance Chain

Four levels, outermost first:

| Level | File | Edit? |
|-------|------|-------|
| `outerLayoutBase` | ApostropheCMS core | Never |
| `outerLayout` | `modules/@apostrophecms/template/views/outerLayout.html` | For `<head>`, meta tags, markup outside `<body>` |
| `layout` | `views/layout.html` | **Yes — site-wide chrome (header, nav, footer)** |
| page template | `modules/<page-type>/views/page.html` | **Yes — page-specific content** |

`views/layout.html` opens with `{% extends data.outerLayout %}`, which resolves to the correct
outer template automatically (handles both full-page and AJAX requests).

## `data.*` Sources in Templates

| Variable | Contents |
|----------|----------|
| `data.page` | Current page document |
| `data.piece` | Current piece (piece-type pages only) |
| `data.global` | Global settings document — includes styles module values |
| `data.user` | Authenticated user, or `null` |
| `data.home` | Home page document |
| `data.query` | Query string as a plain object |
| `data.outerLayout` | Resolves the correct outer layout template |
| `data.localizations` | Array of available locales with `locale`, `label`, `flag`, `url` |
