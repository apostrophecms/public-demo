// JSX equivalent of hero-widget. Renders an editable area, optionally
// followed by a row of styled call-to-action buttons.

export default function (data, { Area, Template, apos }) {
  const widget = data.widget;
  const links = widget.links || [];
  return (
    <div className="widget hero-widget">
      <div className="hero-widget__content">
        <Area doc={widget} name="content" />
      </div>
      {links.length > 0 && (
        <div className="hero-widget__buttons">
          {links.map((item, index) => (
            <Template
              key={item._id || index}
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
