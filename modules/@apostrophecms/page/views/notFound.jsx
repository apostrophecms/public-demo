// Project-level 404 template, in the site's own design. Shadows core's
// `notFound.jsx`, which would also work: it extends any layout.
//
// Strings come from core's `apostrophe:` namespace rather than `project:`, so
// they are already translated in every locale this project ships.

export default function (_data, { Extend, __t }) {
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
