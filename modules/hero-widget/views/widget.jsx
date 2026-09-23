// An editable area, optionally followed by a row of call-to-action buttons.
//
// `data.widget` holds this widget's saved fields, defined in ../index.js.
// Each `links` item uses the lib/link.js fields, so apos.helper.linkPath()
// resolves it the same way as a single-link widget.

export default function (data, {
  Area, Template, apos
}) {
  const widget = data.widget;
  const links = widget.links || [];
  return (
    <div className="widget hero-widget">
      <div className="hero-widget__content">
        {/* Renders the widgets stored in this widget's `content` area field,
            defined in ../index.js. */}
        <Area doc={widget} name="content" />
      </div>
      {links.length > 0 && (
        <div className="hero-widget__buttons">
          {links.map((item) => (
            <Template
              templateName="link.jsx"
              label={item.linkText}
              path={apos.helper.linkPath(item)}
              target={item.linkTarget}
              linkClass={`button button--${item.style}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
