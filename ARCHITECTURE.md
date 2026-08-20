# Architecture

ApostropheCMS 4 demo project built on the essentials starter. This file orients developers
and LLM coding assistants to the project's conventions. It is a reference, not a tutorial.

> **Part B** (hosted Architecture Guide — patterns, advanced topics) will be linked here once published.

---

## Templates: JSX

This project's templates are written in **JSX** rather than Nunjucks. JSX is a server-side
rendering option in ApostropheCMS 4 — it implies no React, no virtual DOM, and no client-side
runtime. It is an alternate template syntax evaluated on the server in the same place Nunjucks
would have run, chosen here for real JavaScript control flow, editor support, and source-mapped
error reporting.

Nunjucks remains a first-class, fully supported option in ApostropheCMS. The two coexist
indefinitely; this project simply completed the conversion.

A template default-exports a function of two arguments:

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

The first argument is the data object referenced as `data.*` in Nunjucks — destructure it and write
`page.title` rather than `data.page.title`. The second is Apostrophe's template helper set:

| Name | Purpose |
|------|---------|
| `apos` | The real `self.apos`. Call any module method directly. Prefer this. |
| `helpers` | Nunjucks-oriented helper wrappers, equivalent to Nunjucks's `apos`. Use only when you need a specific helper's exact behavior. |
| `Area` | Renders an area — replaces `{% area %}` |
| `Component` | Invokes an async component — replaces `{% component %}` |
| `Template` | Renders another template with include semantics — replaces `{% include %}` |
| `Extend` | Renders another template with extends semantics; props become `{% block %}` overrides against a `.html` target — replaces `{% extends %}` |
| `Widget` | Renders a single widget directly; only needed when reimplementing `area.html` |

The function may be `async`, but need not be in order to render async children. Apostrophe collects
pending output, awaits it, and assembles the response in one piece. This is not streaming and there
is no Suspense equivalent. Declare `async` only when the template itself must fetch data first — an
async component is usually the cleaner place for that.

Values are auto-escaped in element bodies and attribute values, matching Nunjucks's default. Emit
trusted raw HTML with `dangerouslySetInnerHTML={{ __html: … }}`.

Two places where this JSX deliberately departs from React: `style` accepts a plain string, and
attributes are emitted verbatim through `escapeAttr()`, so `srcset` and `crossorigin` keep their
standard lowercase HTML spelling. `key` and `ref` are accepted but ignored — there is no client
reconciler for them to serve.

## JSX/Nunjucks Interop

One hard rule governs how the two mix:

> A `.html` template cannot `{% extends %}`, `{% include %}`, or `{% import %}` a `.jsx` template.
> Nunjucks's loader has no way to invoke the JSX renderer. The reverse — JSX consuming Nunjucks,
> including block overrides via `<Extend>` — is fully supported.

That asymmetry dictates migration order. Convert leaves first: each new `page.jsx` extends the
existing `layout.html` via `<Extend>`, while untouched `page.html` files keep working. Only once
every page template extending a given layout is converted can that layout itself become `.jsx`.

Core's `outerLayoutBase.html` will remain Nunjucks for the foreseeable future, since every existing
project's layout extends it. A fully-converted project therefore ends with a `.jsx` layout
extending a Nunjucks outer layout. That is the intended steady state, not a limitation.

Widget templates extend nothing, so `.html` and `.jsx` widgets coexist without constraint.

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
and `styles.group`. Templates read these values from the `global` property of their data argument.

## Shared Link Template

`views/link.jsx` renders anchor tags. Invoke it from any template via `<Template>`:

```jsx
<Template
  templateName="link.jsx"
  label="Click me"
  path={apos.helper.linkPath(widget)}
  target={widget.linkTarget}
  linkClass="button"
/>
```

The class prop is named `linkClass` — not `class` or `className` — because props are forwarded as
the target template's data, and `link.jsx` maps it onto the rendered `className` itself.

For a co-located partial that needs no name-based resolution, plain `import` is the better tool;
JSX templates are ordinary JS modules and can define additional components inline. Reach for
`<Template>` when you want Apostrophe's `module:file` cross-module lookup.

## Server-Side Helpers (`modules/helper/`)

`modules/helper/index.js` (aliased as `helper`) registers **methods**, not Nunjucks helpers.

| Method | Signature | Returns |
|--------|-----------|---------|
| `apos.helper.linkPath(link)` | `link` — a widget or field group using the `lib/link.js` pattern | Resolved URL string |
| `apos.helper.formatDate(date)` | `date` — a JS Date or ISO string | `"Month D, YYYY"` |

Because JSX templates receive the real `apos` object, module methods are callable directly and the
helper-registration indirection is unnecessary. The tradeoff: these are **not** reachable from
Nunjucks templates, which resolve `apos.helper.*` against registered helpers rather than methods.
That is acceptable here because every template consuming them is JSX.

This is the general pattern for JSX templates — call module methods rather than adding helpers.
Use the `helpers` object from the second argument only when you specifically need a Nunjucks
helper's behavior.

Use `apos.helper.linkPath()` as the canonical way to resolve link fields in templates.

## Template Discovery

ApostropheCMS discovers templates by **filename convention** — no registration required:

- Widget template → `modules/<widget-name>/views/widget.jsx`
- Page template → `modules/<page-type>/views/page.jsx`
- Piece index/show → `modules/<piece-page>/views/index.jsx` and `show.jsx`

Naming the file correctly is sufficient; Apostrophe picks it up automatically. The same lookup
rules apply to both extensions, and when `page.jsx` and `page.html` both exist for a module, the
`.jsx` file wins. Converting a template is therefore a rename plus a rewrite — nothing else.

## Template Inheritance Chain

Four levels, outermost first:

| Level | File | Edit? |
|-------|------|-------|
| `outerLayoutBase` | ApostropheCMS core (Nunjucks) | Never |
| `outerLayout` | `modules/@apostrophecms/template/views/outerLayout.html` (Nunjucks) | For `<head>`, meta tags, markup outside `<body>` |
| `layout` | `views/layout.jsx` | **Yes — site-wide chrome (header, nav, footer)** |
| page template | `modules/<page-type>/views/page.jsx` | **Yes — page-specific content** |

`views/layout.jsx` renders `<Extend templateName={data.outerLayout} … />`, which resolves to the
correct outer template automatically (handling both full-page and AJAX requests) and turns each
prop into a `{% block %}` override on that Nunjucks template.

JSX has no named blocks. A parent receives markup as **props**, plus the implicit `children` prop
for anything between the caller's opening and closing tags. `views/layout.jsx` accepts `bodyClass`,
`pageTitle`, `breadcrumbs`, and `main` from page templates; each falls back to a default when the
page does not supply it.

Use `<Extend>` when the target is Nunjucks and you want block-override semantics. Use `<Template>`
for include semantics, where props simply arrive as the target's data. Against a `.jsx` target the
two are identical, since props *are* the data argument.

## Data Sources in Templates

These arrive on the **first function argument**, not as a global `data` object. Destructure what
the template needs.

| Variable | Contents |
|----------|----------|
| `widget` | Widget document (widget templates only) |
| `page` | Current page document |
| `piece` | Current piece (piece-type pages only) |
| `global` | Global settings document — includes styles module values |
| `user` | Authenticated user, or `null` |
| `home` | Home page document |
| `query` | Query string as a plain object |
| `outerLayout` | Resolves the correct outer layout template |
| `localizations` | Array of available locales with `locale`, `label`, `flag`, `url` |
| `contextOptions` | Context options passed down by the enclosing area (widget templates) |
| `children` | Markup passed between a caller's tags (templates used as layouts) |

## Asset URLs and Build Fingerprinting

`apos.asset.url(path)` prefixes the release directory but does not account for Vite fingerprinting
its build outputs. A font referenced from `@font-face` in `_global.scss` is served as
`/assets/poppins.subset-DvBIGq--.woff2`, not `/modules/asset/fonts/poppins.subset.woff2`. Both
paths exist and return 200 in a production build, so a mismatch produces no error — just a wasted
request and, in the case of preloads, no benefit.

`views/layout.jsx` reads the hashed filenames out of `apos.asset.currentBuildManifest` when emitting
font preload tags, so the preloaded URL always matches what the built CSS requests. That property
is internal to `@apostrophecms/asset` and not documented public API; the lookup is written to
degrade to emitting no preload tags rather than throwing if its shape changes. The manifest is
empty in development, where the Vite dev server serves fonts unhashed.

Tracked in PRO-9899, which asks whether a supported API for resolving built asset URLs should exist.
