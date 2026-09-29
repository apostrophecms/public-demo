// Defers to the `prs` async component on this module, which performs the HTTP
// fetch and renders prs.jsx.

export default function ({ widget }, { Component, __t }) {
  return (
    <section className="widget gh-pr-widget">
      <h3 className="gh-pr-widget__title">
        {__t('project:ghPrsForRepo', {
          state: __t(`project:${widget.state}`),
          repo: widget.repo
        })}
      </h3>
      <Component module="github-prs-widget" name="prs" widget={widget} />
    </section>
  );
}
