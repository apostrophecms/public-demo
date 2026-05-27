// JSX equivalent of article:recent. Wraps the article-page Excerpt
// fragment in the article-widget shell so the same template handles
// both the widget rendering and direct invocations.

import { Excerpt } from '../../article-page/views/fragments.jsx';

export default function (data, { Area, apos, __t }) {
  const articles = data.articles || [];
  const displayClass = data.display ? `article-excerpts--display-${data.display}` : '';
  return (
    <div className={`widget article-widget article-excerpts ${displayClass}`}>
      {articles.length > 0 ? (
        articles.map((article) => (
          <Excerpt
            key={article._id}
            article={article}
            apos={apos}
            t={__t}
            Area={Area}
          />
        ))
      ) : (
        <p>{__t('project:noArticles')}</p>
      )}
    </div>
  );
}
