// A single article. Metadata goes in the page-title slot; the image and main
// area go in the main slot.
//
// On a show page, `data.piece` is the article and `data.page` is the article
// index page it belongs to.

export default function (data, { Extend, Area, apos }) {
  const article = data.piece;
  // `_image`, `_author`, and `_categories` are relationships (see
  // modules/article/index.js): loaded at request time and always arrays.
  // apos.image.first() takes the attachment from `_image`, and
  // apos.attachment.url() turns it into a URL for one image size.
  const attachment = apos.image.first(article._image);
  const url = attachment ? apos.attachment.url(attachment, { size: 'full' }) : null;
  const title = data.piece.title;

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
              {apos.helper.formatDate(article.publishedAt)}
            </div>
          </div>
          {article._categories && article._categories.length > 0 && (
            <div className="inner article-topics article-topics--show">
              {article._categories.map((category) => (
                <a
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
          {/* Renders the widgets stored in the article's `main` area field,
              defined in modules/article/index.js. */}
          <Area doc={article} name="main" />
        </article>
      }
    />
  );
}
