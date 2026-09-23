// Article index. Supplies category filter chips as the page title, then
// renders excerpts in two clusters — the first two get a featured horizontal
// treatment — followed by a pager.
//
// The pager is built from small local components rather than the macros in
// @apostrophecms/pager, keeping the template self-contained.
//
// Filter and pager links come from core rather than being assembled here:
// with `static: true` on @apostrophecms/url they are paths
// (`/articles/categories/news/page/2`), not query strings.

import { Excerpt } from './fragments.jsx';

function PagerPage({
  page, options, pagerClass, pageUrl
}) {
  if (page > options.total) {
    return null;
  }
  const pageClass = pagerClass ? `${pagerClass}__item` : '';
  const classes = [
    pageClass,
    page === 1 ? ' is-first' : '',
    page === options.total ? ' is-last' : '',
    page === options.page ? ' is-active' : ''
  ].join('');
  const isActive = options.page === page;
  return (
    <span className={classes}>
      {isActive
        ? page
        : (
          <a href={pageUrl(page)}>{page}</a>
        )
      }
    </span>
  );
}

function Pager({
  options, pageUrl, helpers
}) {
  if (!((options.page > 1) || (options.total > 1))) {
    return null;
  }
  const pagerClass = options.class || 'pager';
  const gapClass = pagerClass ? `${pagerClass}__gap` : '';
  const range = helpers.pager.pageRange({
    page: options.page,
    total: options.total,
    shown: options.shown || 5
  });
  return (
    <div className={pagerClass}>
      <PagerPage page={1} options={options} pagerClass={pagerClass} pageUrl={pageUrl} />
      {helpers.pager.showHeadGap(options) && (
        <span className={gapClass}>&hellip;</span>
      )}
      {range.map((page) => (
        (page > 1 && page < options.total) && (
          <PagerPage
            page={page}
            options={options}
            pagerClass={pagerClass}
            pageUrl={pageUrl}
          />
        )
      ))}
      {helpers.pager.showTailGap(options) && (
        <span className={gapClass}>&hellip;</span>
      )}
      <PagerPage
        page={options.total}
        options={options}
        pagerClass={pagerClass}
        pageUrl={pageUrl}
      />
    </div>
  );
}

export default function (data, {
  Extend, Area, apos, helpers, __t
}) {
  const title = data.page && data.page.title;
  const pieces = data.pieces || [];
  const featured = pieces.slice(0, 2);
  const rest = pieces.slice(2);

  // Populated by core from the `piecesFilters` option in
  // modules/article-page/index.js. Each choice carries its own `_url` and
  // `active` flag.
  const filters = data.filters || [];
  const categoryChoices = (filters.find((filter) => filter.name === 'categories') || {})
    .choices || [];

  // A static URL can express at most one filter, so paging keeps whichever
  // one is active (a category or an author) and drops the rest.
  const activeFilter = filters.find((filter) => filter.choices.some((choice) => choice.active));
  const activeChoice = activeFilter && activeFilter.choices.find((choice) => choice.active);
  const pageUrl = (n) => data.page._url + (activeChoice
    ? apos.url.getChoiceFilter(activeFilter.name, activeChoice.value, n)
    : apos.url.getPageFilter(n));

  return (
    <Extend
      templateName="layout.jsx"
      pageTitle={
        <div className="article-title-wrapper">
          <div className="layout">
            <h1 className="page-title">{title}</h1>
            <ul className="article-topic-filters">
              <li>
                <a
                  href={data.page._url}
                  className={!activeChoice ? 'active' : undefined}
                >
                  {__t('project:allArticles')}
                </a>
              </li>
              {categoryChoices.map((choice) => (
                <li>
                  <a
                    href={choice._url}
                    className={choice.active ? 'active' : undefined}
                  >
                    {choice.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      main={
        <section className="article-index">
          <header className="article-intro general-content">
            {/* Renders the widgets stored in the index page's `intro` area
                field, defined in modules/article-page/index.js. */}
            <Area doc={data.page} name="intro" />
          </header>

          <div className="article-excerpts article-excerpts--display-horizontal article-excerpts--display-featured">
            {featured.map((article) => (
              <Excerpt
                article={article}
                locale={data.locale}
                apos={apos}
                __t={__t}
                Area={Area}
              />
            ))}
          </div>

          <div className="article-excerpts article-excerpts--display-grid">
            {rest.map((article) => (
              <Excerpt
                article={article}
                locale={data.locale}
                apos={apos}
                __t={__t}
                Area={Area}
              />
            ))}
          </div>

          <Pager
            options={{
              page: data.currentPage,
              total: data.totalPages
            }}
            pageUrl={pageUrl}
            helpers={helpers}
          />
        </section>
      }
    />
  );
}
