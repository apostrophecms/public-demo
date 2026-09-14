// Renders the pull request list. Receives `pulls` (the GitHub API response)
// and the request `locale`, or an `error` code, from the async component in
// ../index.js.

// Dates are formatted through Intl rather than a hardcoded month list, so they
// follow the request's locale along with the surrounding strings.
function formatDate(value, locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(locale || 'en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export default function (data, { __t }) {
  if (data.error === 'rateLimited') {
    return <p>{__t('project:prsRateLimited')}</p>;
  }
  if (data.error || !Array.isArray(data.pulls)) {
    return <p>{__t('project:prsUnavailable')}</p>;
  }
  return (
    <ol className="gh-pr-widget__items">
      {data.pulls.map((item) => (
        <li className="gh-pr-widget__item">
          <h2 className="gh-pr-widget__subtitle">
            <a href={item.html_url}>{item.title}</a>
          </h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={item.user.html_url}
            className="gh-pr-widget__details"
          >
            <img
              loading="lazy"
              className="gh-pr-widget__avatar"
              src={item.user.avatar_url}
              alt={item.user.login}
            />
            <p className="gh-pr-widget__login">{item.user.login}</p>
          </a>
          <div className="gh-pr-widget__subdetails">
            <p className="gh-pr-widget__subdetail">
              {__t('project:prOpenedOn', { date: formatDate(item.created_at, data.locale) })}
            </p>
            <p className="gh-pr-widget__subdetail">
              {__t('project:prNumber', { number: item.number })}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
