// Locale switcher used by the global layout in both desktop and mobile nav.
// `data.localizations` is an array provided by Apostrophe i18n.

const ChevronDown = () => (
  <svg
    className="locales__toggler__chevron"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Check = () => (
  <svg
    className="locales__toggler__check"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function (data) {
  const localizations = data.localizations || [];
  const current = localizations.find((l) => l.current);
  return (
    <div className="locales" data-locales>
      <button
        className="locales__toggler"
        data-locales-toggle
        aria-expanded="false"
        aria-controls="locales-list"
        onclick="aposSwitchLocale(this)"
      >
        {current && (
          <span className="locales__toggler__text">
            <div
              className="locales__toggler__flag"
              style={`background-image: url(https://flagsapi.com/${current.flag}/flat/32.png)`}
            />
            <span className="locales__toggler__active-label">
              {current.label}
            </span>
            <ChevronDown />
          </span>
        )}
      </button>
      <ul id="locales-list" className="locales__list" data-locales-list hidden>
        {localizations.map((localization) => localization._url && (
          <li
            key={localization.locale}
            className={`locales__item ${localization.current ? 'current' : ''}`}
          >
            <a href={localization._url || localization.homePageUrl}>
              <div
                className="locales__toggler__flag"
                style={`background-image: url(https://flagsapi.com/${localization.flag}/flat/32.png)`}
              >
                {localization.current && <Check />}
              </div>
              {localization.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
