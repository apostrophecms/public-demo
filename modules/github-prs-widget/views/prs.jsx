// JSX equivalent of the prs.html component template. Receives the
// `response` body and the originating `widget` from the async component
// in github-prs-widget/index.js.

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function formatDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return value;
  }
  return `${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}

export default function (data) {
  if (!data.response) {
    return "Something isn't right :(";
  }
  if (data.response.message) {
    return <h3>{data.response.message}</h3>;
  }
  return (
    <ol className="gh-pr-widget__items">
      {data.response.map((item) => (
        <li key={item.id || item.number} className="gh-pr-widget__item">
          <h2 className="gh-pr-widget__subtitle">
            <a href={item.url}>{item.title}</a>
          </h2>
          <a target="_blank" href={item.user.html_url} className="gh-pr-widget__details">
            <img
              loading="lazy"
              className="gh-pr-widget__avatar"
              src={item.user.avatar_url}
              alt="item.user.login"
            />
            <p className="gh-pr-widget__login">{item.user.login}</p>
          </a>
          <div className="gh-pr-widget__subdetails">
            <p className="gh-pr-widget__subdetail">Opened on {formatDate(item.created_at)}</p>
            <p className="gh-pr-widget__subdetail">Number {item.number}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
