// Used via <Template templateName="link.jsx" ... />. The data comes
// straight from the caller's props (path, label, target, linkClass).
//
// Every link an editor marks as opening in a new tab is rendered here, so the
// `rel` guard belongs in this one place rather than at each call site.

export default function (data) {
  const target = Array.isArray(data.target) ? data.target[0] : data.target;
  const newTab = target === '_blank';
  return (
    <a
      className={data.linkClass ? `link ${data.linkClass}` : undefined}
      href={data.path}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {data.label}
    </a>
  );
}
