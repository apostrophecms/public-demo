// `Excerpt` renders one article as a card: image, categories, authors, date,
// and blurb. Imported by article-page/index.jsx and article/views/recent.jsx.
// `Byline` lists an article's authors; show.jsx uses it too.
//
// It takes `apos`, `__t`, and `Area` as props because only a template's
// default export receives the helper object — an imported component is a
// plain function and gets nothing but its props.

// Joins author names the way the locale does ("A, B and C" in English,
// "A, B et C" in French). With `authorUrl`, each name links there.
export function Byline({ authors, locale, authorUrl }) {
  const parts = new Intl.ListFormat(locale || 'en', { type: 'conjunction' })
    .formatToParts(authors.map((author) => author.title));
  let next = 0;
  return (
    <>
      {parts.map((part) => {
        if (part.type === 'literal') {
          return part.value;
        }
        const author = authors[next++];
        return authorUrl
          ? <a href={authorUrl(author)}>{author.title}</a>
          : author.title;
      })}
    </>
  );
}

export function Excerpt({
  article, locale, apos, __t, Area
}) {
  // `_image`, `_authors`, and `_categories` are relationships: loaded at request
  // time and always arrays. The image URL takes two steps, apos.image.first()
  // for the attachment and then apos.attachment.url() for a sized URL.
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
            <em>{__t('project:needArticleIndex')}</em>
          </p>
        )}
        {article._categories && article._categories.length > 0 && (
          <div className="article-topics">
            {article._categories.map((category) => (
              <a
                href={article._parentUrl + apos.url.getChoiceFilter('categories', category.slug, 1)}
                className="chip"
              >
                {category.title}
              </a>
            ))}
          </div>
        )}
        {article._authors && article._authors.length > 0 && (
          <div className="article-detail article-author">
            {__t('project:writtenBy')}{' '}
            <Byline authors={article._authors} locale={locale} />
          </div>
        )}
        <div className="article-detail article-published">
          {apos.helper.formatDate(article.publishedAt)}
        </div>
        <h3>
          <a href={article._url}>{article.title}</a>
        </h3>
        <article>
          {!apos.area.isEmpty(article, 'blurb')
            ? (
              // Renders the article's `blurb` area field, defined in
              // modules/article/index.js.
              <Area doc={article} name="blurb" />
            )
            : (
              <p className="placeholder">{__t('project:noSummary')}</p>
            )
          }
        </article>
      </div>
    </div>
  );
}
