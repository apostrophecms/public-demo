# AGENTS.md -- ApostropheCMS Standalone Starter

## Architecture

ApostropheCMS standalone: a single Node.js/Express server that renders templates server-side and serves the editing UI. The CMS, content API, and frontend are all one process -- no separate frontend server. Templates can be written in Nunjucks (`.html`) or JSX (`.jsx`); both are fully supported and can coexist in the same project.

Start dev: `npm run dev` -> `http://localhost:3000/login`

## Adding a Widget

1. Create `modules/my-widget/index.js` -- set `extend: '@apostrophecms/widget-type'`, `options.label`, and `fields.add`.
2. Create `modules/my-widget/views/widget.html` (Nunjucks) or `widget.jsx` (JSX). Widget data is at `data.widget` in Nunjucks; destructure as `widget` in JSX.
3. Register in `app.js`: add `'my-widget': {}` to the `modules` object.
4. Add the widget to an area's `widgets` config (import from `lib/area.js` or inline in the schema).

No template registry to update -- discovery is automatic by filename convention.

## Adding a Page Type

1. Create `modules/my-page/index.js` -- set `extend: '@apostrophecms/page-type'` and `fields.add`.
2. Create `modules/my-page/views/page.html` or `page.jsx`.
   - **Nunjucks:** `{% extends "layout.html" %}`, override `{% block main %}`.
   - **JSX:** `export default function({ page }, { Area, Extend }) { return <Extend templateName="layout" main={<Area doc={page} name="main" />} />; }`
3. Register in `app.js`: add `'my-page': {}` to the `modules` object.
4. Add to the `types` array in `modules/@apostrophecms/page/index.js` so editors can select it.

## Template Language Rules

- `.jsx` can extend or include `.html` templates (use `<Extend>` to override blocks, `<Template>` to include).
- `.html` templates **cannot** extend or include `.jsx` templates -- convert from the leaves up.
- When both `page.jsx` and `page.html` exist, `.jsx` wins.

## The `_` Prefix Convention

Fields starting with `_` are relationship fields. Apostrophe populates them at request time and returns them as **arrays**, even when `max: 1`.

```nunjucks
{# Nunjucks -- always use [0] or apos.image.first() #}
{% set attachment = apos.image.first(data.widget._image) %}
{% if article._author.length %}{{ article._author[0].title }}{% endif %}
```
```jsx
// JSX -- same rule, plain JS syntax
const attachment = apos.image.first(widget._image);
{article._author.length > 0 && article._author[0].title}
```

## Shared Field Utilities (`lib/`)

- **`lib/link.js`** -- Canonical link field set (`linkType`, `_linkPage`, `_linkFile`, `linkUrl`, `linkTarget`). Spread with `...linkConfig.link` into any schema needing a link. Do not copy these fields manually.
- **`lib/area.js`** -- Exports `basicConfig`, `fullConfig`, `fullConfigExpandedGroups`. Import the right one for each area's `widgets` option.
- **`lib/iconChoices.js`** -- Icon choice arrays for select fields.
- **`lib/options.js`** -- Shared module option sets.

## i18n Key Convention

The starter uses the `project:` namespace by default: `label: 'project:myField'`.
Translations live in `modules/@apostrophecms/i18n/i18n/project/`.
You can continue adding keys there, or introduce your own namespace by adding a matching folder and translation files under `i18n/`.

## Template Data Sources

```
Nunjucks          JSX (destructured)   Contents
data.page         page                 Current page document
data.piece        piece                Current piece on show pages; null on regular pages
data.global       global               Site-wide Global Settings -- always available
data.home         home                 Home page; _children = top-level nav pages
data.widget       widget               Current widget data (widget templates only)
```

## Helper Module (`modules/helper/index.js`)

Helpers registered with `self.addHelpers()` are available in all Nunjucks templates as `apos.helper.functionName()`. In JSX, use the `helpers` object (second arg) or call `apos.*` methods directly.

- `apos.helper.linkPath(item)` -- Resolves a link object to a URL (page, file, or custom). **Always use this** -- do not navigate `_linkPage[0]._url` manually in templates.
- `apos.helper.formatDate(date)` -- Returns a human-readable date string (dayjs).

To add a helper: add a function to `self.addHelpers({})` in `modules/helper/index.js`.

## Area Tag

```nunjucks
{# Nunjucks #}
{% area data.page, 'main' %}
{% area data.widget, 'content' %}
```
```jsx
// JSX
<Area doc={page} name="main" />
<Area doc={widget} name="content" />
```

## Reusable Template Fragments

```nunjucks
{# Nunjucks -- macro import #}
{% import 'link.html' as link %}
{{ link.render({ label: item.linkText, path: apos.helper.linkPath(item), target: item.linkTarget, class: 'button' }) }}
```
```jsx
// JSX -- real JS import; or use <Template name="link" /> to render a Nunjucks partial
import LinkButton from '../components/LinkButton.jsx';
```

## Image Rendering Pattern

Two steps -- never access `_image[0].attachment` manually:

```nunjucks
{# Nunjucks #}
{% set attachment = apos.image.first(article._image) %}
{% set url = attachment and apos.attachment.url(attachment, { size: 'full' }) %}
{% if url %}
  <img src="{{ url }}"
       width="{{ apos.attachment.getWidth(attachment) }}"
       height="{{ apos.attachment.getHeight(attachment) }}"
       srcset="{{ apos.image.srcset(attachment) }}">
{% endif %}
```
```jsx
// JSX
const attachment = apos.image.first(article._image);
const url = attachment && apos.attachment.url(attachment, { size: 'full' });
url && <img src={url}
            width={apos.attachment.getWidth(attachment)}
            height={apos.attachment.getHeight(attachment)}
            srcSet={apos.image.srcset(attachment)} />;
```

Default size variants: `'max'`, `'full'`, `'two-thirds'`, `'one-half'`, `'one-third'`, `'one-sixth'`. These can be overridden or extended via the `imageSizes` configuration object in `modules/@apostrophecms/attachment/index.js` at project level.

## Project Constraints

- Do not change existing HTML class names -- they are tied to existing SCSS.
- Do not rename or alter field names in `lib/link.js` -- templates and `modules/helper/index.js` depend on them.
- `card-title-rt-widget` and `card-content-rt-widget` are configured inline in `app.js` intentionally (minor rich-text variants). Do not move them.
- Widget visual variants use the widget's `styles` property in `index.js` (per-instance CSS controls), not `select` schema fields for appearance.

## Architecture Guide

Full explanations, annotated examples, and walkthroughs: **[Standalone Architecture Guide](https://docs.apostrophecms.org/guide/standalone-architecture.html?utm_source=standalone-starter&utm_medium=Codex-file&utm_campaign=architecture-guide)**
