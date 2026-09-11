// Locale switcher used by the global layout in both desktop and mobile nav.
// `localizations` is an array provided by Apostrophe i18n; each entry carries a
// `flag` country code assigned in modules/@apostrophecms/i18n/index.js.
//
// Called directly rather than through <Template>, so it receives `apos` as a
// second argument — an imported function gets no helper object of its own.

// Flags are served from modules/asset/public/flags/ rather than a third-party
// image service: no external requests, no visitor IPs leaving the site, and
// nothing to break under a Content-Security-Policy. They are square to suit
// the circular 24px crop in _locales.scss.
function flagUrl(apos, flag) {
  return apos.asset.url(`/modules/asset/flags/${String(flag).toLowerCase()}.svg`);
}

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

export default function (data, apos) {
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
            <span
              className="locales__toggler__flag"
              style={`background-image: url(${flagUrl(apos, current.flag)})`}
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
            className={`locales__item ${localization.current ? 'current' : ''}`}
          >
            <a href={localization._url}>
              <span
                className="locales__toggler__flag"
                style={`background-image: url(${flagUrl(apos, localization.flag)})`}
              >
                {localization.current && <Check />}
              </span>
              {localization.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
