// The default page type: the project layout with a single editable area.

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
