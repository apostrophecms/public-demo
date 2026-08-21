# AGENTS.md — public-demo

Machine-readable project brief for AI coding assistants. Facts and conventions only.

---

## Architecture

ApostropheCMS 4 demo project built on the essentials starter, using ES modules (`"type": "module"`).
Modules live in `modules/`, shared field config in `lib/`, **JSX templates** in `views/` and
`modules/*/views/`. Asset pipeline uses `@apostrophecms/vite`; client-side source is in
`modules/asset/ui/src/`. Supports i18n (en, fr, de, es) and CMS-editable design tokens via
`modules/@apostrophecms/styles/`.

This project has been **fully converted from Nunjucks to JSX templates**. Write new templates as
`.jsx`. Nunjucks remains fully supported by ApostropheCMS core and the two interoperate — see
[JSX/Nunjucks Interop](#jsxnunjucks-interop) for the one hard rule.

JSX here is **server-side rendering only**. There is no React, no virtual DOM, no client runtime.
It is an alternate template syntax evaluated on the server exactly where Nunjucks would have run.

## Dev Commands

```
npm run dev      # start with nodemon (watches modules/, lib/, views/, incl. .jsx)
npm start        # start without watch
npm run build    # production asset build
npm run serve    # production server
```

## Anatomy of a JSX Template

A template **default-exports a function** taking two arguments:

```jsx
export default function ({ page }, { Area }) {
  return (
    <>
      <h1>{page.title}</h1>
      <Area doc={page} name="main" />
    </>
  );
}
```

1. **`data`** — the same object referenced as `data.*` in Nunjucks. Destructure it; write
   `page.title`, not `data.page.title`.
2. **Helpers** — `{ apos, helpers, Area, Component, Extend, Template, Widget, __t }`.

The function may be `async`, but does not need to be in order to render async children. Apostrophe
awaits all pending output before sending the response. Declare `async` only when the template itself
must fetch something first.

## The Second Argument

| Name | Purpose |
|------|---------|
| `apos` | The real `self.apos`. Call any module method directly. **Prefer this.** |
| `helpers` | The Nunjucks-oriented helper wrappers. Equivalent to Nunjucks's `apos`. Use only when you need a Nunjucks helper's exact behavior. |
| `Area` | Renders an area. Replaces `{% area %}` |
| `Component` | Invokes an async component. Replaces `{% component %}` |
| `Template` | Renders another template, **include semantics** (props arrive as data). Replaces `{% include %}` |
| `Extend` | Renders another template, **extends semantics**. Against a `.html` target, props become `{% block %}` overrides. Replaces `{% extends %}` |
| `Widget` | Renders a single widget directly. Only for reimplementing `area.html` |
| `__t` | Localization helper. Same `req.t` as the Nunjucks `__t` global — request-scoped and locale-aware. Not on `data`, and not on `helpers`. |

Against a `.jsx` target, `Template` and `Extend` behave identically.

## Nunjucks → JSX Cheat Sheet

| Nunjucks | JSX |
|----------|-----|
| `{{ data.page.title }}` | `{page.title}` |
| `{% if data.user %}…{% endif %}` | `{user && …}` |
| `{% for x in xs %}…{% endfor %}` | `{xs.map((x) => …)}` |
| `{% area data.page, 'main' %}` | `<Area doc={page} name="main" />` |
| `{% component 'product:newest' with { max: 3 } %}` | `<Component module="product" name="newest" max={3} />` |
| `{% include "footer.html" %}` | `<Template name="footer" />` |
| `{% extends "layout.html" %}` + `{% block main %}` | `<Extend templateName="layout" main={…} />` |
| `{{ content \| safe }}` | `dangerouslySetInnerHTML={{ __html: content }}` |

Notes:

- `key` and `ref` are accepted but ignored — there is no client reconciler. Don't add them.
- Values are auto-escaped in both element bodies and attribute values, matching Nunjucks.
- Unlike React, `style` accepts a **plain string** (`style={`background-image: url(${url})`}`).
  Attributes pass through `escapeAttr()` verbatim, so `srcset` and `crossorigin` are written in
  their standard lowercase HTML form.
- Templates are real JS modules. `import` helpers and define additional components in the same file.
- Errors carry source maps and report accurate `.jsx` line/column.

## Adding a Widget

1. Create `modules/<widget-name>/index.js` — extend `@apostrophecms/widget-type`
2. Create `modules/<widget-name>/views/widget.jsx`
3. Register in `app.js` under `modules`: `'<widget-name>': {}`
4. Add to an area's `widgets` config (inline or via `lib/area.js`)

Example module path: `modules/card-widget/index.js`
Example template path: `modules/card-widget/views/widget.jsx`

```jsx
export default function ({ widget }, { Area }) {
  return (
    <div className="widget card-widget">
      <Area doc={widget} name="contentRT" />
    </div>
  );
}
```

## Adding a Page Type

1. Create `modules/<page-name>/index.js` — extend `@apostrophecms/page-type`
2. Create `modules/<page-name>/views/page.jsx`
3. Register in `app.js` under `modules`: `'<page-name>': {}`
4. Add to `modules/@apostrophecms/page/index.js` → `options.types` array

Example module path: `modules/default-page/index.js`
Example template path: `modules/default-page/views/page.jsx`

Page templates extend the site layout by passing named slots as props:

```jsx
export default function ({ page }, { Area, Template }) {
  return (
    <Template templateName="layout" main={<Area doc={page} name="main" />} />
  );
}
```

## Template Discovery

Apostrophe discovers templates by filename — **no registry required**.

| Template type | Path convention |
|---------------|-----------------|
| Widget | `modules/<widget-name>/views/widget.jsx` |
| Page | `modules/<page-type>/views/page.jsx` |
| Piece index | `modules/<piece-page>/views/index.jsx` |
| Piece show | `modules/<piece-page>/views/show.jsx` |

When both `page.jsx` and `page.html` exist for the same module, **`.jsx` wins**. Converting a
template means renaming the file and rewriting its contents; no configuration changes.

## JSX/Nunjucks Interop

> **A `.html` template cannot `{% extends %}`, `{% include %}`, or `{% import %}` a `.jsx`
> template.** Nunjucks's loader cannot invoke the JSX renderer. The reverse is fully supported.

Consequences:

- JSX consuming Nunjucks is fine, including block overrides via `<Extend>`.
- Never leave a `.html` template extending a `.jsx` template.
- Widget templates extend nothing, so `.html` and `.jsx` widgets coexist freely.

Remaining `.html` templates in this project:

| File | Why |
|------|-----|
| `modules/@apostrophecms/template/views/outerLayout.html` | Stock override; extends core `outerLayoutBase.html`. `views/layout.jsx` extends *it*, which is the intended steady state — core's outer layout stays Nunjucks. |

## Template Inheritance

```
outerLayoutBase.html  ← ApostropheCMS core (never edit)
  outerLayout.html    ← override in modules/@apostrophecms/template/views/ for <head>/meta
    views/layout.jsx  ← edit for site chrome (header, nav, footer)
      modules/<page-type>/views/page.jsx ← edit for page content
```

`views/layout.jsx` uses `<Extend templateName={data.outerLayout} … />`, whose props become
`{% block %}` overrides on the Nunjucks outer layout. It accepts these named props from page
templates: `bodyClass`, `pageTitle`, `breadcrumbs`, `main`.

There are no named blocks in JSX. Markup the parent renders is passed as props, plus the implicit
`children` prop for anything between the opening and closing tags.

## Data Sources in Templates

Available on the **first function argument**. Destructure what you need.

| Variable | Contents | Notes |
|----------|----------|-------|
| `widget` | Widget document | Widget templates only |
| `page` | Current page document | All page templates |
| `piece` | Current piece document | Piece-type page templates only |
| `global` | Global settings + styles tokens | Requires `@apostrophecms/global` |
| `user` | Authenticated user or `null` | All templates |
| `home` | Home page document | All templates |
| `query` | Query string as object | All templates |
| `outerLayout` | Resolves the correct outer layout | Handles full-page vs AJAX |
| `localizations` | Available locales with flag + url | All templates |
| `contextOptions` | Context options passed by the enclosing area | Widget templates |
| `children` | Markup passed between a caller's tags | Templates used as layouts |

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

## Server-Side Helpers (`modules/helper/`)

`modules/helper/index.js` is aliased as `helper` and registers **methods**, not Nunjucks helpers.
JSX receives the real `apos`, so methods are called directly:

- `apos.helper.linkPath(link)` — canonical link resolver; accepts a widget or field group using the
  `lib/link.js` pattern; returns a URL string
- `apos.helper.formatDate(date)` — formats a date as `"Month D, YYYY"`

These are **not** reachable from Nunjucks templates, which resolve `apos.helper.*` against
registered helpers rather than methods. That is intentional: all templates consuming them are JSX.

## Shared Link Template (`views/link.jsx`)

`views/link.jsx` renders anchor tags. Invoke it via `<Template>`:

```jsx
<Template
  templateName="link.jsx"
  label={widget.linkText}
  path={apos.helper.linkPath(widget)}
  target={widget.linkTarget}
  linkClass="button"
/>
```

Note the prop is `linkClass`, not `class` or `className`.

## Asset URLs and Fingerprinting

`apos.asset.url(path)` prefixes the release directory but does **not** account for Vite
fingerprinting build outputs. A font referenced by `@font-face` is served as
`/assets/poppins.subset-DvBIGq--.woff2`, not `/modules/asset/fonts/poppins.subset.woff2` — both
exist and return 200, so mismatches fail silently.

`views/layout.jsx` therefore reads hashed filenames from `apos.asset.currentBuildManifest` when
emitting font preloads. That property is internal to `@apostrophecms/asset` and undocumented; the
lookup is written to degrade to zero preload tags rather than throw. Tracked in PRO-9899.
