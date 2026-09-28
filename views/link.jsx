// Used via <Template templateName="link.jsx" ... />. The data comes
// straight from the caller's props (path, label, target, linkClass).
//
// Every link an editor marks as opening in a new tab is rendered here, so the
// `rel` guard belongs in this one place rather than at each call site.

export default function ({
  path, label, target, linkClass
}) {
  const newTab = (Array.isArray(target) ? target[0] : target) === '_blank';
  return (
    <a
      className={linkClass ? `link ${linkClass}` : undefined}
      href={path}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {label}
    </a>
  );
}
