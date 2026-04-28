// JSX equivalent of article-widget. Delegates to the article module's
// `recent` async component, the same shape as the original Nunjucks
// `{% component "article:recent" %}` invocation.

export default function (data, { Component }) {
  return (
    <Component
      module="article"
      name="recent"
      limit={data.widget.limit}
      display={data.widget.display}
    />
  );
}
