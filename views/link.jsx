// Used via <Template templateName="link.jsx" ... />. The data comes
// straight from the caller's props (path, label, target, linkClass).

export default function (data) {
  const target = Array.isArray(data.target) ? data.target[0] : data.target;
  return (
    <a
      className={data.linkClass ? `link ${data.linkClass}` : undefined}
      href={data.path}
      target={target === '_blank' ? '_blank' : undefined}
    >
      {data.label}
    </a>
  );
}
