// Defers to the `prs` async component on this module, which performs the HTTP
// fetch and renders prs.jsx.

const capitalize = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export default function (data, { Component }) {
  return (
    <section className="widget gh-pr-widget">
      <h3 className="gh-pr-widget__title">
        {capitalize(data.widget.state)} PRs for {data.widget.repo}
      </h3>
      <Component module="github-prs-widget" name="prs" widget={data.widget} />
    </section>
  );
}
