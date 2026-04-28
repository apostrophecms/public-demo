// JSX equivalent of card-widget. Optional icon, two editable areas, and
// an optional call-to-action button. Icons are looked up by name through
// the macros/icons.jsx template using the Apostrophe `<Template>`
// resolver, mirroring `{% import '@apostrophecms/template:macros/icons.html' %}`.

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
            linkClass={`button ${widget.style}`}
          />
        </div>
      )}
    </div>
  );
}
