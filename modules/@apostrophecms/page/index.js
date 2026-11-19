// The page types editors can choose when creating a page. A page type module
// registered in app.js does not appear in the page manager until it is
// listed here.

// Just enough of a related page to link to it: its tree position plus what
// the navigation and breadcrumbs in views/layout.jsx show. Without a
// projection, every page is loaded with `_children` and `_ancestors` (and
// `home`, which is `_ancestors[0]` or fetched with the same builders) carrying
// each related page's entire content, none of which is displayed.
const relatedPageProjection = {
  title: 1,
  slug: 1,
  type: 1,
  metaType: 1,
  path: 1,
  level: 1,
  rank: 1,
  orphan: 1,
  visibility: 1,
  aposDocId: 1,
  aposLocale: 1,
  aposMode: 1,
  _url: 1
};

export default {
  options: {
    // Replaces the core default, `{ ancestors: { children: true }, children: true }`,
    // keeping its shape but projecting the related pages
    builders: {
      ancestors: {
        // The @apostrophecms/seo module falls back to the home page's
        // SEO title and description
        project: {
          ...relatedPageProjection,
          seoTitle: 1,
          seoDescription: 1
        },
        children: {
          project: relatedPageProjection
        }
      },
      children: {
        project: relatedPageProjection
      }
    },
    types: [
      {
        name: 'default-page',
        label: 'project:defaultPage'
      },
      {
        name: 'article-page',
        label: 'project:articleIndexPage'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'project:home'
      }
    ]
  }
};
