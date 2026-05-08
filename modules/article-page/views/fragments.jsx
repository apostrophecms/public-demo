// JSX equivalent of the Nunjucks `excerpt` fragment. Exposed as the
// `Excerpt` named export so callers (article-page/index.jsx and the
// article-widget recent.jsx snippet) can import and render it.
//
// Because exported components are reused across files, runtime helpers
// like `apos`, `__t`, and the `Area` JSX helper are passed in as props
// rather than relying on a single template's destructured runtime
// context.

export function Excerpt({
  article, apos, t, Area
}) {
  const attachment = apos.image.first(article._image);
  const url = attachment ? apos.attachment.url(attachment, { size: 'one-half' }) : null;
  return (
    <div className="article-excerpt">
      {url && (
        <a className="article-excerpt-image-container" href={article._url}>
          <img
            loading="lazy"
            className="article-excerpt-image"
            src={url}
            alt={attachment.title}
            width={apos.attachment.getWidth(attachment)}
            height={apos.attachment.getHeight(attachment)}
            srcset={apos.image.srcset(attachment)}
          />
        </a>
      )}
      <div className="article-excerpt-content">
        {!article._url && (
          <p className="meta">
            <em>{t('project:needArticleIndex')}</em>
          </p>
        )}
        {article._categories && article._categories.length > 0 && (
          <div className="article-topics">
            {article._categories.map((category) => (
              <a
                key={category._id || category.slug}
                href={`${article._parentSlug}?categories=${category.slug}`}
                className="chip"
              >
                {category.title}
              </a>
            ))}
          </div>
        )}
        {article._author && article._author.length > 0 && (
          <div className="article-detail article-author">
            {t('project:writtenBy')} {article._author[0].title}
          </div>
        )}
        <div className="article-detail article-published">
          {apos.helper.formatDate(article.publishedAt)}
        </div>
        <h3>
          <a href={article._url}>{article.title}</a>
        </h3>
        <article>
          {!apos.area.isEmpty(article, 'blurb') ? (
            <Area doc={article} name="blurb" />
          ) : (
            <p className="placeholder">{t('project:noSummary')}</p>
          )}
        </article>
      </div>
    </div>
  );
}
