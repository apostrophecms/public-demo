# AGENTS.md — public-demo

Machine-readable project brief for AI coding assistants. Facts and conventions only.

---

## Architecture

ApostropheCMS 4 demo project built on the essentials starter, using ES modules (`"type": "module"`).
Modules live in `modules/`, shared field config in `lib/`, **JSX templates** in `views/` and
`modules/*/views/`. Asset pipeline uses `@apostrophecms/vite`; client-side source is in
`modules/asset/ui/src/`. Supports i18n (en, fr, de) and CMS-editable design tokens via
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
- **Fonts arrive late.** With `font-display: swap` the typeface can change mid-render. Dev-only.

Neither reproduces under `npm run build && npm run serve`. Conversely, genuine asset bugs are
invisible in dev, because release directories and built CSS only exist in a production build.
**Anything touching assets, fonts, or areas must be checked against a production build before it is
believed.**

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
| `{% include "footer.html" %}` | `<Template templateName="footer.jsx" />` |
| `{% extends "layout.html" %}` + `{% block main %}` | `<Extend templateName="layout.jsx" main={…} />` |
| `{{ content \| safe }}` | `dangerouslySetInnerHTML={{ __html: content }}` |

Notes:

- `key` and `ref` are accepted but silently ignored — there is no client reconciler for them to
  serve. **Do not add them**, even inside `.map()`. There is no "missing key" warning here because
  there is nothing to warn about, and writing them teaches the wrong mental model.
- That is not a rule against `_id`. Distinguish the inert React habit from real uses:
  `widgetId: widget._id` in `layout-widget` is load-bearing. Removing it breaks scoped
  styling silently.
- The `.jsx` in `templateName` is not a constraint — see [Template Discovery](#template-discovery).
  It is written because every template in this project is `.jsx`.
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
export default function ({ page }, { Area, Extend }) {
  return (
    <Extend templateName="layout.jsx" main={<Area doc={page} name="main" />} />
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
templates: `title`, `bodyClass`, `pageTitle`, `breadcrumbs`, `main`.

There are no named blocks in JSX. Markup the parent renders is passed as props, plus the implicit
`children` prop for anything between the opening and closing tags.

## Data Sources in Templates

Available on the **first function argument**. Destructure what you need.

| Variable | Contents | Notes |
|----------|----------|-------|
| `widget` | Widget document | Widget templates only |
| `page` | Current page document | All page templates |
| `piece` | Current piece document | Piece-type page templates only |
| `global` | Global settings document | Requires `@apostrophecms/global` |
| `user` | Authenticated user or `null` | All templates |
| `home` | Home page document | All templates |
| `query` | Query string as object | All templates |
| `outerLayout` | Resolves the correct outer layout | Handles full-page vs AJAX |
| `localizations` | Available locales with flag + url | All templates |
| `contextOptions` | Context options passed by the enclosing area | Widget templates |
| `children` | Markup passed between a caller's tags | Templates used as layouts |

## `_` Prefix Convention

Relationship fields **must** be prefixed with `_` (e.g., `_linkPage`, `_author`, `_categories`).
Core throws if they are not.

- Value is always an **array**, even with `max: 1`
- Not stored in the document — the ids are, under `<name>Ids`; the docs are joined at query time
- The prefix is what prevents the joined docs being written back on the next save
- Access single results via `doc._field[0]`

## Filter and Pagination URLs

`modules/@apostrophecms/url` sets `static: true`, so piece-page filters and pages are **paths**,
not query strings: `/articles/categories/news/page/2`, not `/articles?categories=news&page=2`.
Query strings still work on the way in; nothing should generate them.

- Filters are declared in `piecesFilters` on `modules/article-page/index.js` (`categories`,
  `authors`). Each gets its own dispatch routes and a `data.filters` entry in the index template.
- In the index template, link to a filter through its choice's `_url`; don't build the URL yourself.
- Elsewhere, append `apos.url.getChoiceFilter(name, value, page)` or
  `apos.url.getPageFilter(page)` to a page's `_url`, or a piece's `_parentUrl`.
- Use `_parentUrl`, never `_parentSlug`. The slug lacks the `/fr` or `/de` locale prefix.
- A static URL expresses one filter at a time.

## Article Authors

Articles credit **`author` pieces** through `_authors` (coauthors allowed), never users.
An author is a byline and may have no user account at all.

- `author` is `localized: false`: one author per person, shared by every locale.
- A user links to at most one author through their own `_author` field, which admins can set.
- `apos.author.ensureForUser(user)` returns that author, creating and linking a new one if the
  user has none or theirs was archived or deleted.
  It runs when a user starts a new article (the default `_authors`) and whenever they save one.
- A user's display name change is copied to their author unless `syncUserName: false`. Nothing
  else syncs, and archiving a user leaves their author untouched.
- Do not add relationships to `@apostrophecms/user` for anything visitors see.

## Shared Field Utilities (`lib/`)

| File | Exports | Use for |
|------|---------|---------|
| `lib/area.js` | `basicConfig`, `fullConfig`, `fullConfigExpandedGroups` | Area field `widgets` option |
| `lib/link.js` | `link` field group | Spread into `fields.add` for linkType + `_linkPage` + `_linkFile` + `linkUrl` |
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

## Asset URLs and Font Preloads

A file in a module's `public/` folder that CSS references by `/modules/...` path, such as a font in
`@font-face`, is **not** fingerprinted. The build keeps its `modules/...` path, but relative to the
built CSS files in the release directory, not the site root. `apos.asset.url()` adds that same
release-directory prefix, so `apos.asset.url('/modules/asset/fonts/poppins.subset.woff2')` in a
template is exactly the URL the built CSS requests. Never write the bare `/modules/...` path in
markup. Cache busting comes from the release directory.

`views/layout.jsx` relies on this to emit `<link rel="preload">` tags for the webfonts:

- Its `fonts` list must name the same files as the `@font-face` rules in
  `modules/asset/ui/src/_global.scss`. Add, rename, or remove a font in both places.
- A mismatch fails silently: both URLs return 200, and the font just downloads twice.
- Vite inlines any asset under 4 KB into the built CSS as a `data:` URL. A font that small needs
  no request, so preloading it is redundant: leave it out of the list. All four current fonts
  are over 4 KB.

This applies only to `public/` files referenced by `/modules/...` path. Any other file Vite emits
may be fingerprinted under `/assets/`, and there is no supported API for resolving those names.
Reference such files from CSS rather than building their URLs in a template.
