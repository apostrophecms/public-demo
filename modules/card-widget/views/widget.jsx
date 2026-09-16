// A card: optional icon, two editable areas, and an optional call to action.
// The icon is chosen by name in the schema, so it is resolved at render time
// through macros/icons.jsx rather than imported statically.
//
// `data.widget` holds this widget's saved fields, defined in ../index.js.
// The link fields come from lib/link.js and are resolved with
// apos.helper.linkPath() rather than read directly.

export default function (data, {
  Area, Template, apos
}) {
  const widget = data.widget;
  return (
    <div className={`widget card-widget card-widget--bg-${widget.bg} card-widget--orientation-${widget.orientation}`}>
      {widget.icon && (
        <div className="card__icon">
          <Template
            templateName="@apostrophecms/template:macros/icons.jsx"
            name={widget.icon}
          />
        </div>
      )}
      <div className="card__content">
        <div className="card__title-container">
          {/* Area fields on the widget itself, defined in ../index.js. Each
              accepts only its matching rich text variant from app.js. */}
          <Area doc={widget} name="titleRT" />
        </div>
        <div className="card__text-container">
          <Area doc={widget} name="contentRT" />
        </div>
      </div>
      {widget.linkText && (
        <div className="card__link">
          <Template
            templateName="link.jsx"
            label={widget.linkText}
            path={apos.helper.linkPath(widget)}
            target={widget.linkTarget}
            linkClass={`button button--${widget.style || 'primary'}`}
          />
        </div>
      )}
    </div>
  );
}
