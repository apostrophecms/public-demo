// JSX equivalent of the home page template. Extends the project layout,
// switches the body class, swaps in a chip-styled page title, and renders
// the page's `main` area inside the home wrapper.

export default function (data, { Extend, Area, __t }) {
  return (
    <Extend
      templateName="layout.jsx"
      bodyClass="notfound-page"
      pageTitle={
        <h1 className="home-title">
          <span className="chip">Not Found</span>
        </h1>
      }
      main={
        <div className="home">
          <div className="content">
            <div className="general-content">
              <h2>Sorry, there's nothing there.</h2>
            </div>
          </div>
        </div>
      }
    />
  );
}
