// Defers to the `prs` async component on this module, which performs the HTTP
// fetch and renders prs.jsx.

export default function (data, { Component, __t }) {
  return (
    <section className="widget gh-pr-widget">
      <h3 className="gh-pr-widget__title">
        {__t('project:ghPrsForRepo', {
          state: __t(`project:${data.widget.state}`),
          repo: data.widget.repo
        })}
      </h3>
      <Component module="github-prs-widget" name="prs" widget={data.widget} />
    </section>
  );
}
