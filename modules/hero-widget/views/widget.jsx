// Rich text editable in place, optionally followed by a row of
// call-to-action buttons.
//
// `widget` holds this widget's saved fields, defined in ../index.js.
// Each `links` item uses the lib/link.js fields, so apos.helper.linkPath()
// resolves it the same way as a single-link widget.

export default function ({ widget }, {
  Field, Template, apos
}) {
  const links = widget.links || [];
  return (
    <div className="widget hero-widget">
      <div className="hero-widget__content">
        {/* The `content` richText field, defined in ../index.js, rendered
            as a div and editable in place. `demo-rte` keeps the shared rich
            text styles the old rich text widget wrapper carried. */}
        <Field doc={widget} name="content" with={{ class: 'demo-rte hero-widget__text' }} />
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
