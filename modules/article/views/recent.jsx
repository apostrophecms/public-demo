// The article module's `recent` component. Wraps Excerpt in the article-widget
// shell, so one template serves both the widget and direct invocations.

import { Excerpt } from '../../article-page/views/fragments.jsx';

export default function (data, { Area, apos, __t }) {
  const articles = data.articles || [];
  const displayClass = data.display ? `article-excerpts--display-${data.display}` : '';
  return (
    <div className={`widget article-widget article-excerpts ${displayClass}`}>
      {articles.length > 0
        ? (
          articles.map((article) => (
            <Excerpt
              article={article}
              apos={apos}
              __t={__t}
              Area={Area}
            />
          ))
        )
        : (
          <p>{__t('project:noArticles')}</p>
        )
      }
    </div>
  );
}
