# Architecture

Quick reference for developers working in this codebase. For prose explanations, annotated code examples, and full walkthroughs of every pattern below, see the **[Standalone Architecture Guide](https://docs.apostrophecms.org/guide/standalone-architecture.html?utm_source=standalone-starter&utm_medium=architecture-file&utm_campaign=architecture-guide)**.

---

## Template Discovery

Templates are auto-discovered by filename — no registry to update. Both `.html` (Nunjucks) and `.jsx` are supported; if both exist, `.jsx` wins.

| What | Path |
|------|------|
| Widget template | `modules/{name}/views/widget.html` or `.jsx` |
| Page template | `modules/{name}/views/page.html` or `.jsx` |
| Piece index page | `modules/{name}/views/index.html` or `.jsx` |
| Piece show page | `modules/{name}/views/show.html` or `.jsx` |

**One-direction rule:** a `.jsx` template can extend or include a `.html` template. A `.html` template cannot extend or include a `.jsx` template.

## Template Inheritance (not a directory tree)

The arrows below show `{% extends %}` relationships, not folder nesting.

```
data.outerLayout  ①
  └── views/layout.html  ②
        ├── modules/{page-type}/views/page.{html,jsx}  ③
        └── modules/{piece-page}/views/
              ├── index.{html,jsx}  ④
              └── show.{html,jsx}   ⑤
```

① Apostrophe's HTML shell — typically not edited  
② Site header, nav, footer — edit here for site-wide structural changes  
③ Regular page content  
④ Paginated list of all pieces of this type  
⑤ Individual piece detail  

`index.html` and `show.html` are **not** nested under `page.html` — they each extend `views/layout.html` independently. JSX page templates bridge to the Nunjucks layout with `<Extend templateName="layout" main={...} />`.

## Data Sources in Templates

| Variable | Nunjucks | JSX (destructured arg) | Contents |
|----------|----------|------------------------|----------|
| Page | `data.page` | `page` | Current page document |
| Piece | `data.piece` | `piece` | Current piece on show pages; `null` elsewhere |
| Global | `data.global` | `global` | Site-wide Global Settings (always available) |
| Home | `data.home` | `home` | Home page; `_children` = top-level nav pages |
| Widget | `data.widget` | `widget` | Current widget data (widget templates only) |

## The `_` Prefix Convention

Fields starting with `_` are relationship fields. Apostrophe resolves them at request time and returns them as **arrays**, even when `max: 1`. Always use `[0]` or `apos.image.first()` for images.

```js
// Schema
_image: { type: 'relationship', withType: '@apostrophecms/image', max: 1 }
```
```nunjucks
{# Nunjucks #}
{% set attachment = apos.image.first(data.widget._image) %}
```
```jsx
// JSX -- apos arrives in the second argument
const attachment = apos.image.first(widget._image);
```

## `lib/` Utilities

| File | What it contains |
|------|-----------------|
| `lib/link.js` | Canonical link fields (linkType, `_linkPage`, `_linkFile`, linkUrl, linkTarget). Spread into any schema needing a link. |
| `lib/area.js` | Area widget configs: `basicConfig`, `fullConfig`, `fullConfigExpandedGroups`. |
| `lib/iconChoices.js` | Shared icon choice arrays for select fields. |
| `lib/options.js` | Shared module option sets. |

## i18n Convention

The starter uses the `project:` namespace by default (`label: 'project:myField'`), with translation files at `modules/@apostrophecms/i18n/i18n/project/`. You can continue adding keys there or introduce your own namespace — just add a matching folder and translation files under `i18n/`.

## Styling

There are two distinct styling systems:

**Global Styles** — site-wide CMS-controlled CSS properties configured in `modules/@apostrophecms/styles/index.js`. Editors adjust colors, spacing, typography, and other design tokens through a dedicated admin UI; the module generates and injects the resulting stylesheet automatically. See the [Global Styles guide](https://apostrophecms.com/docs/guide/global-styles.html).

**Widget Styles** — per-instance CSS controls declared in a widget's `styles` property in `index.js`. They use the same field types as global styles but are scoped to each widget instance and are edited through the widget editor modal. See the [Widget Styles guide](https://apostrophecms.com/docs/guide/widget-styles.html).
