// JSX equivalent of the article show template. Extends the project
// layout, rendering the article's metadata in the page-title slot and
// the article body (image + main area) in the page's main slot.

export default function (data, { Extend, Area, apos }) {
  const article = data.piece;
  const attachment = apos.image.first(article._image);
  const url = attachment ? apos.attachment.url(attachment, { size: 'full' }) : null;
  const title = (data.piece && data.piece.title) || (data.page && data.page.title);

  return (
    <Extend
      templateName="layout.jsx"
      pageTitle={
        <div className="article-title-wrapper">
          <div className="layout">
            <h1 className="page-title">{title}</h1>
          </div>
          <div className="article-details">
            {article._author && article._author.length > 0 && (
              <div className="article-detail article-author">
                Written by{' '}
                <a href={`${article._parentSlug}?author=${article._author[0].slug}`}>
                  {article._author[0].title}
                </a>
              </div>
            )}
            <div className="article-detail article-published">
              {apos.helper.formatDate(article.publishedDate)}
            </div>
          </div>
          {article._categories && article._categories.length > 0 && (
            <div className="inner article-topics article-topics--show">
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
        </div>
      }
      main={
        <article className="article-show general-content">
          {url && (
            <img
              className="article-show__image"
              src={url}
              alt={article.title}
              loading="lazy"
              width={apos.attachment.getWidth(attachment)}
              height={apos.attachment.getHeight(attachment)}
              srcset={apos.image.srcset(attachment)}
            />
          )}
          <Area doc={article} name="main" />
        </article>
      }
    />
  );
}
