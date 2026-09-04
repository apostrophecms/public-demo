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

[ARCHITECTURE.md](ARCHITECTURE.md) covers the same conventions in prose, with the rationale behind
them, for human contributors and as a deeper reference for coding assistants. It is not imported
here — its length isn't worth loading into every session — so open it directly when this file's
tables don't explain enough (a "why" question, an edge case, or unfamiliar code that doesn't match
the summary above).

## Dev Commands

```
npm run dev      # start with nodemon (watches modules/, lib/, views/, incl. .jsx)
npm start        # start without watch
npm run build    # production asset build
npm run serve    # production server
```

### Verify visual changes in production, not dev

`npm run dev` differs from production in ways that produce symptoms looking like bugs:

- **CSS is injected by JS.** Each navigation briefly paints unstyled, full-width HTML before
  `.layout` centers it — content appears to "expand from the center." Dev-only.
- **The build manifest reports no assets.** `entrypoints[].files.assets` is `[]`, so `layout.jsx`
  emits no font preloads and fonts arrive after first paint. With `font-display: swap` the typeface
  changes mid-render. Dev-only.

Neither reproduces under `npm run build && npm run serve`. Conversely, genuine asset bugs are
invisible in dev — dead font preloads shipped unnoticed precisely because dev never exercises
fingerprinted URLs. **Anything touching assets, fonts, areas, or the manifest must be checked
against a production build before it is believed.**

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

- `key` and `ref` are accepted but silently ignored — there is no client reconciler for them to
  serve. **Do not add them**, even inside `.map()`. There is no "missing key" warning here because
  there is nothing to warn about, and writing them teaches the wrong mental model.
- That is not a rule against `_id`. Distinguish the inert React habit from real uses: `id={widget._id}`
  and the matching `#${widget._id}` selector in `button-widget`, and `widgetId: widget._id` in
  `layout-widget`, are load-bearing. Removing those breaks scoped styling silently.
- Values are auto-escaped in both element bodies and attribute values, matching Nunjucks.
- Unlike React, `style` accepts a **plain string** (`style={`background-image: url(${url})`}`).
  Attributes pass through `escapeAttr()` verbatim, so `srcset` and `crossorigin` are written in
  their standard lowercase HTML form.
- Templates are real JS modules. `import` helpers and define additional components in the same file.
- **Only the default export receives the second argument.** Inline and imported components are plain
  functions, so anything they need — `apos`, `Area`, `__t` — must be passed as explicit props.
  See `Excerpt` in `modules/article-page/views/fragments.jsx`.
- **Pass helpers under their own names.** Write `__t={__t}`, not `t={__t}`. The redundancy is the
  point: renaming in flight means a search for `__t` misses the file that uses it most, and the
  reader has to trace a prop back to learn what it is. Same for `apos` and `Area`.
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

Resolution walks the module's view-folder chain, **nearest directory first**, trying `.jsx`, then
`.njk`, then `.html` within each directory. Directory position wins; extension only breaks ties
inside a single directory. A project-level `page.jsx` beats a core-level `page.html` — and equally,
a project-level `page.html` beats a core-level `page.jsx`.

An explicit `.jsx`, `.njk`, or `.html` in a template name is a starting point, not a constraint:
all three are tried, so `<Extend templateName="layout.html" />` resolves to `layout.jsx` when one
exists. Any other extension (`.svg`) is matched literally. See `resolveTemplate` in
`apostrophe/modules/@apostrophecms/template/lib/jsxRender.js`.

Converting a template means renaming the file and rewriting its contents; no configuration changes.

## JSX/Nunjucks Interop

> **A `.html` template cannot `{% extends %}`, `{% include %}`, or `{% import %}` a `.jsx`
> template.** Nunjucks's loader cannot invoke the JSX renderer. The reverse is fully supported.

Consequences:

- JSX consuming Nunjucks is fine, including block overrides via `<Extend>`.
- Never leave a `.html` template extending a `.jsx` template.
- Widget templates extend nothing, so `.html` and `.jsx` widgets coexist freely.
- **`.html` templates inside `node_modules` count.** Core's
  `@apostrophecms/page/views/notFound.html` extends `layout.html`, so a `.jsx` layout breaks every
  404 unless the project shadows it. `modules/@apostrophecms/page/views/notFound.jsx` exists for
  exactly that reason — it is not a redundant override, and deleting it fails only in production.

Remaining `.html` templates in this project:

| File | Why |
|------|-----|
| `modules/@apostrophecms/template/views/outerLayout.html` | Stock override; extends core `outerLayoutBase.html`. `views/layout.jsx` extends *it*, which is the intended steady state — core's outer layout stays Nunjucks. |

The asymmetry is in the loaders. `resolveTemplate` treats a `.jsx`/`.njk`/`.html` suffix as a
starting point and tries all three, so a JSX template asking for `layout.html` finds `layout.jsx`.
Nunjucks's `env.getTemplate()` does a literal filename lookup and does not — which is why the break
lands on Nunjucks templates you did not write.

Before converting a layout, check what depends on it:

```
grep -rlE "\{%\s*(extends|include|import)\s+['\"]layout\.html" node_modules --include=*.html
```

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
- Configured locales: `en`, `fr` (`/fr`), `de` (`/de`) — see
  `modules/@apostrophecms/i18n/index.js`. An `es.json` exists and is kept in step, but Spanish is
  not currently in `options.locales`, so it is not reachable.
- Locale flags are square SVGs in `modules/asset/public/flags/`, referenced through
  `apos.asset.url()`. Deliberately not a third-party image service.

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
