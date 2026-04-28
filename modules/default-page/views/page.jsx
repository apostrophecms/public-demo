// JSX equivalent of the Nunjucks default page template. Extends the
// project layout (layout.jsx in views/) and supplies a `main` block.

export default function (data, { Extend, Area }) {
  return (
    <Extend
      templateName="layout.jsx"
      main={
        <div className="general-content">
          <Area doc={data.page} name="main" />
        </div>
      }
    />
  );
}
