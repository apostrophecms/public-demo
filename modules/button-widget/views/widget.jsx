// An anchor styled as a button. Editor-chosen color comes from the widget's
// `styles` (see ../index.js): core sets `--button-primary-color` on `.button`,
// and `_button.scss` uses that token for both the resting and hover states.
//
// `data.widget` holds this widget's saved fields, defined in ../index.js.

export default function (data, { Template, apos }) {
  const widget = data.widget;
  const path = apos.helper.linkPath(widget);
  const classes = [
    widget.block ? `button-widget--block-${widget.block}` : '',
    widget.alignment ? `button-widget--alignment-${widget.alignment}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`widget button-widget ${classes}`}>
      <Template
        templateName="link.jsx"
        label={widget.linkText}
        path={path}
        target={widget.linkTarget}
        linkClass={`button button--${widget.style || 'primary'}`}
      />
    </div>
  );
}
