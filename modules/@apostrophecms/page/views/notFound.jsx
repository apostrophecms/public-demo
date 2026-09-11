// Project-level 404 template. Shadows core's `notFound.html`, which must be
// overridden here: core's version is Nunjucks and extends `layout.html`, and a
// Nunjucks template cannot extend this project's JSX `layout.jsx`.
//
// Strings come from core's `apostrophe:` namespace rather than `project:`, so
// they are already translated in every locale this project ships.

export default function (data, { Extend, __t }) {
  return (
    <Extend
      templateName="layout.jsx"
      title={__t('apostrophe:notFound')}
      bodyClass="notfound-page"
      pageTitle={
        <h1 className="home-title">
          <span className="chip">{__t('apostrophe:notFound')}</span>
        </h1>
      }
      main={
        <div className="home">
          <div className="content">
            <div className="general-content">
              <h2>{__t('apostrophe:notFoundPageMessage')}</h2>
            </div>
          </div>
        </div>
      }
    />
  );
}
