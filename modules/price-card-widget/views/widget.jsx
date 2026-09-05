// A pricing card: optional icon-led badge, title and copy, price block,
// optional features list, and an optional call to action.

export default function ({ widget }, { Template, apos, __t }) {
  const features = widget.features || [];
  const buttonStyle = widget.buttonStyle || 'primary';
  return (
    <div className={`widget price-card-widget price-card-widget--featured-${widget.featured} price-card-widget--has-badge-${widget.badge}`}>
      {widget.badge && (
        <div className="price-card__badge">
          <div className="price-card__chip chip">
            {widget.badgeIcon && (
              <span className="price-card__badge-icon">
                <Template
                  templateName="@apostrophecms/template:macros/icons.jsx"
                  name={widget.badgeIcon}
                />
              </span>
            )}
            <span className="price-card__badge-label">
              {widget.badgeLabel || __t('project:noBadgeLabel')}
            </span>
          </div>
        </div>
      )}
      <h3 className="price-card__title">{widget.title}</h3>
      <p className="price-card__content">{widget.content}</p>
      <div className="price-card__price">
        <span className="price-card__price-text">
          {widget.priceText || __t('project:noPriceText')}
        </span>
        {widget.priceTextUnit && (
          <span className="price-card__price-detail">{widget.priceTextUnit}</span>
        )}
      </div>
      {widget.priceDetail && (
        <p className="price-card__price-detail">{widget.priceDetail}</p>
      )}
      {features.length > 0 && (
        <ol className="price-card__features">
          {features.map((feature) => (
            <li>{feature.item}</li>
          ))}
        </ol>
      )}
      {widget.linkText && (
        <div className="price-card__link">
          <Template
            templateName="link.jsx"
            label={widget.linkText}
            path={apos.helper.linkPath(widget)}
            target={widget.linkTarget}
            linkClass={`button button--${buttonStyle} button--small`}
          />
        </div>
      )}
    </div>
  );
}
