// JSX equivalent of the article-index page. Extends the project layout
// with a custom page title (filter chips), then renders the article
// excerpts in two clusters (the first two get a featured horizontal
// treatment) followed by an inline pager.
//
// The pager macros from @apostrophecms/pager are inlined as small
// helper components so the whole template stays self-contained.

import { Excerpt } from './fragments.jsx';

function PagerPage({
  page, options, pagerClass, url, apos
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
      {isActive ? page : (
        <a href={apos.url.build(url, { page })}>{page}</a>
      )}
    </span>
  );
}

function Pager({ options, url, apos }) {
  if (!((options.page > 1) || (options.total > 1))) {
    return null;
  }
  const pagerClass = options.class || '';
  const gapClass = pagerClass ? `${pagerClass}__gap` : '';
  const range = apos.pager.pageRange({
    page: options.page,
    total: options.total,
    shown: options.shown || 5
  });
  return (
    <div className={pagerClass}>
      <PagerPage page={1} options={options} pagerClass={pagerClass} url={url} apos={apos} />
      {apos.pager.showHeadGap(options) && (
        <span className={gapClass}>&hellip;</span>
      )}
      {range.map((page) => (
        (page > 1 && page < options.total) && (
          <PagerPage
            key={page}
            page={page}
            options={options}
            pagerClass={pagerClass}
            url={url}
            apos={apos}
          />
        )
      ))}
      {apos.pager.showTailGap(options) && (
        <span className={gapClass}>&hellip;</span>
      )}
      <PagerPage
        page={options.total}
        options={options}
        pagerClass={pagerClass}
        url={url}
        apos={apos}
      />
    </div>
  );
}

export default function (data, {
  Extend, Area, apos, __t
}) {
  const title = (data.piece && data.piece.title) || (data.page && data.page.title);
  const pieces = data.pieces || [];
  const featured = pieces.slice(0, 2);
  const rest = pieces.slice(2);

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
                  href="?"
                  className={!data.query.categories ? 'active' : undefined}
                >
                  All Articles
                </a>
              </li>
              {(data._categories || []).map((category) => (
                <li key={category._id || category.slug}>
                  <a
                    href={`?categories=${category.slug}`}
                    className={data.query.categories === category.slug ? 'active' : undefined}
                  >
                    {category.title}
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
            <Area doc={data.page} name="intro" />
          </header>

          <div className="article-excerpts article-excerpts--display-horizontal article-excerpts--display-featured">
            {featured.map((article) => (
              <Excerpt
                key={article._id}
                article={article}
                apos={apos}
                t={__t}
                Area={Area}
              />
            ))}
          </div>

          <div className="article-excerpts article-excerpts--display-grid">
            {rest.map((article) => (
              <Excerpt
                key={article._id}
                article={article}
                apos={apos}
                t={__t}
                Area={Area}
              />
            ))}
          </div>

          <Pager
            options={{ page: data.currentPage, total: data.totalPages }}
            url={data.url}
            apos={apos}
          />
        </section>
      }
    />
  );
}
