// JSX equivalent of article-category/views/recent.html. Renders a
// trimmed-down article excerpt list using the article's `blurb` area.

export default function (data, { Area, apos, __t }) {
  const articles = data.articles || [];
  if (articles.length === 0) {
    return <p>{__t('project:noArticles')}</p>;
  }
  return (
    <>
      {articles.map((article) => (
        <div key={article._id} className="article-excerpt">
          {!article._url && (
            <p className="meta">
              <em>{__t('project:needArticleIndex')}</em>
            </p>
          )}
          <h3>
            <a href={article._url}>{article.title}</a>
          </h3>
          <article>
            {!apos.area.isEmpty(article, 'blurb') ? (
              <p className="article-blurb"><Area doc={article} name="blurb" /></p>
            ) : (
              <p className="placeholder">{__t('project:noSummary')}</p>
            )}
          </article>
        </div>
      ))}
    </>
  );
}
