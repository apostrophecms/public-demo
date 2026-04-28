// JSX equivalent of github-prs-widget. Defers the heavy lifting (the
// HTTP fetch) to the existing `prs` async component on this same module,
// which now resolves to prs.jsx via Apostrophe template resolution.

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
