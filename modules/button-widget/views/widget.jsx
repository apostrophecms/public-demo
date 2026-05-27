// JSX equivalent of button-widget. Renders an anchor styled as a button
// and emits a scoped <style> block driving the hover color from a widget
// schema field.

export default function (data, { Template, apos }) {
  const widget = data.widget;
  const path = apos.helper.linkPath(widget);
  const classes = [
    widget.block ? `button-widget--block-${widget.block}` : '',
    widget.alignment ? `button-widget--alignment-${widget.alignment}` : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={`widget button-widget ${classes}`} id={widget._id}>
        <Template
          templateName="link.jsx"
          label={widget.linkText}
          path={path}
          target={widget.linkTarget}
          linkClass="button"
        />
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
  #${widget._id} .button:hover{
    background-color: ${widget.color}
  }`
      }} />
    </>
  );
}
