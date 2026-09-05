// Home page. Sets the body class, supplies a chip-styled page title, and
// renders the page's `main` area inside the home wrapper.

export default function (data, { Extend, Area, __t }) {
  return (
    <Extend
      templateName="layout.jsx"
      bodyClass="home-page"
      pageTitle={
        <h1 className="home-title">
          <span className="chip">{__t('project:homeTitle')}</span>
        </h1>
      }
      main={
        <div className="home">
          <div className="content">
            <div className="general-content">
              <Area doc={data.page} name="main" />
            </div>
          </div>
        </div>
      }
    />
  );
}
