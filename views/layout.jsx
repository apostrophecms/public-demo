// Top-level project layout. Extends Apostrophe's outerLayout (a Nunjucks
// template) and accepts these named props from page templates:
//
//   title       string used as the document <title>, overriding the
//               piece/page title. Templates with no page or piece in scope
//               (notFound.jsx) rely on this.
//   bodyClass   string appended to <body class>
//   pageTitle   JSX node rendered in place of the default page-title block
//   breadcrumbs JSX node rendered in place of the default breadcrumb trail
//   main        JSX node providing the page's main content
//
// Extending a Nunjucks template from JSX uses the bridge implemented in
// `jsxRender.js`: each prop becomes a {% block %} override on the
// underlying Nunjucks template.
//
// Props and page data arrive in the same first argument. Apostrophe also
// provides, here and in every template that extends this one:
//   page    the current page document; undefined on the 404 page
//   piece   the current piece on show pages; undefined elsewhere
//   global  the Global Settings document (modules/@apostrophecms/global)
//   home    the home page; home._children feeds the nav

import Locales from './locales.jsx';
import Logo from './logo.jsx';

function defaultTitle(page, piece) {
  return (piece && piece.title) || (page && page.title);
}

function siteTitle(global) {
  // Matches the siteTitle default in modules/@apostrophecms/global/index.js.
  return (global && global.siteTitle) || 'ApostropheCMS Site';
}

// `_siteLogo` is a relationship, so it arrives as an array of image documents.
// Getting a URL takes two steps: apos.image.first() pulls the attachment out
// of that array, then apos.attachment.url() builds the URL for one size.
function logoUrls(global, apos) {
  const logoAttachment = apos.image.first(global && global._siteLogo);
  const logoAttachmentDark = apos.image.first(global && global._siteLogoDark);
  return {
    logoAttachment,
    logoAttachmentDark,
    logoUrl: logoAttachment && apos.attachment.url(logoAttachment, { size: 'one-third' }),
    logoUrlDark: logoAttachmentDark && apos.attachment.url(logoAttachmentDark, { size: 'one-third' })
  };
}

function NavLinks({ home, page }) {
  const homeSlug = home && home.slug;
  const pageSlug = page && page.slug;
  const children = (home && home._children) || [];
  return (
    <ul>
      <li>
        <a
          className={pageSlug === homeSlug ? 'active' : undefined}
          href={home && home._url}
        >
          {home && home.title}
        </a>
      </li>
      {children.map((child) => child.visibility === 'public' && (
        <li>
          <a
            className={pageSlug === child.slug ? 'active' : undefined}
            href={child._url}
          >
            {child.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Breadcrumbs({ page, piece }) {
  const ancestors = (page && page._ancestors) || [];
  if (!ancestors.length) {
    return null;
  }
  return (
    <div className="layout">
      <nav className="breadcrumb">
        {ancestors.map((ancestor) => (
          <a href={ancestor._url}>{ancestor.title}</a>
        ))}
        <a
          className={!piece ? 'current-page' : undefined}
          href={page._url}
        >
          {page.title}
        </a>
        {piece && (
          <a className="current-page" href={piece._url}>{piece.title}</a>
        )}
      </nav>
    </div>
  );
}

function PageTitle({ page, piece }) {
  return (
    <div className="page-title-wrapper">
      <h1 className="page-title">{defaultTitle(page, piece)}</h1>
    </div>
  );
}

// Preload the webfonts so text paints in the real face rather than swapping
// in later (`font-display: swap` otherwise reflows the page mid-render).
// These must be the same paths the `@font-face` rules in `_global.scss`
// request, or each font downloads twice. Leave out any font under 4 KB: Vite
// inlines it into the CSS, so there is nothing to preload.
const fonts = [
  'poppins.subset.woff2',
  'quicksand.subset.woff2',
  'roboto.subset.woff2',
  'roboto-italic.subset.woff2'
];

function ExtraHead({ apos }) {
  return (
    <>
      {fonts.map((font) => (
        <link
          rel="preload"
          href={apos.asset.url(`/modules/asset/fonts/${font}`)}
          as="font"
          type="font/woff2"
          crossorigin
        />
      ))}
    </>
  );
}

function Header({
  home, page, global, localizations, apos, __t
}) {
  const {
    logoAttachment, logoAttachmentDark, logoUrl, logoUrlDark
  } = logoUrls(global, apos);
  return (
    <header className="header">
      <div className="nav-bar">
        <h2>
          {/* Locale-aware: a hardcoded "/" sends visitors from /fr or /de to
              the English home page. home._url carries the locale prefix. */}
          <a href={(home && home._url) || '/'}>
            {logoAttachment
              ? (
                <img
                  id="nav-logo"
                  src={logoUrl}
                  alt={global && global.siteTitle}
                  width={apos.attachment.getWidth(logoAttachment) || '100'}
                  height={apos.attachment.getHeight(logoAttachment) || '36'}
                  data-dark-url={logoAttachmentDark ? logoUrlDark : undefined}
                  data-light-url={logoUrl}
                />
              )
              : (
                global && global.siteTitle
              )
            }
          </a>
        </h2>
        <nav className="nav" role="navigation">
          <NavLinks home={home} page={page} />
        </nav>
        <div className="nav-bar__end">
          <Locales localizations={localizations} apos={apos} />
        </div>
        <button className="nav__mobile-button" data-mobile-trigger aria-controls="mobile-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu-icon lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
          <span>{__t('project:menu')}</span>
        </button>
      </div>
    </header>
  );
}

function MobileNav({
  home, page, localizations, apos, __t
}) {
  return (
    <div className="mobile-nav" data-mobile-nav="hidden" aria-hidden="true">
      <button className="mobile-nav__close-trigger" data-mobile-close-trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span>{__t('project:closeMenu')}</span>
      </button>
      <nav id="mobile-nav" className="mobile-nav__nav" role="navigation">
        <NavLinks home={home} page={page} />
      </nav>
      <div className="mobile-nav__locales">
        <Locales localizations={localizations} apos={apos} id="mobile-locales-list" />
      </div>
    </div>
  );
}

function Footer({ home, __t }) {
  return (
    <footer className="footer">
      <div className="footer__section footer__top">
        <div className="footer__column footer__column--logo">
          <a href={(home && home._url) || '/'} className="footer__logo">
            <Logo />
          </a>
        </div>
        <div className="footer__column">
          <h4>{__t('project:footerExplore')}</h4>
          <ul>
            <li><a href="http://apostrophecms.com/?utm_source=demo" target="_blank" rel="noopener noreferrer">ApostropheCMS.com</a></li>
            <li><a href="https://docs.apostrophecms.org/?utm_source=demo" target="_blank" rel="noopener noreferrer">ApostropheCMS Docs</a></li>
            <li><a href="https://docs.apostrophecms.org/guide/development-setup.html?utm_source=demo" target="_blank" rel="noopener noreferrer">Getting Started</a></li>
            <li><a href="https://apostrophecms.com/assembly?utm_source=demo" target="_blank" rel="noopener noreferrer">ApostropheCMS Multisite</a></li>
            <li><a href="https://meetings.hubspot.com/tom-boutell/demo-meeting?utm_source=demo" target="_blank" rel="noopener noreferrer">Book a Call</a></li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>{__t('project:footerProduct')}</h4>
          <ul>
            <li><a href="https://apostrophecms.com/extensions?license=pro&utm_source=demo" target="_blank" rel="noopener noreferrer">Pro Feature</a></li>
            <li><a href="https://apostrophecms.com/hosting?utm_source=demo" target="_blank" rel="noopener noreferrer">Hosting</a></li>
            <li><a href="https://apostrophecms.com/blog?category=product-updates&utm_source=demo" target="_blank" rel="noopener noreferrer">Changelog</a></li>
            <li><a href="https://apostrophecms.com/accessibility?utm_source=demo" target="_blank" rel="noopener noreferrer">Accessibility</a></li>
            <li><a href="https://apostrophecms.com/security?utm_source=demo" target="_blank" rel="noopener noreferrer">Security</a></li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>{__t('project:footerSocialMedia')}</h4>
          <ul>
            <li><a href="https://bsky.app/profile/apostrophecms.com" target="_blank" rel="noopener noreferrer">Bluesky</a></li>
            <li><a href="https://x.com/apostrophecms" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
            <li><a href="https://discord.com/invite/HwntQpADJr" target="_blank" rel="noopener noreferrer">Join the Discord</a></li>
            <li><a href="https://youtube.com/c/apostrophecms" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://www.linkedin.com/company/apostrophecms/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function ModeSwitch({ __t }) {
  return (
    <div className="mode-switch" data-mode-switch>
      <label htmlFor="light-dark-toggle">
        <span className="sr-only">{__t('project:toggleDarkMode')}</span>
        <input
          className="toggle-checkbox"
          type="checkbox"
          name="light-dark-toggle"
          id="light-dark-toggle"
          role="switch"
          aria-label={__t('project:toggleDarkMode')}
        />
        <div className="toggle-slot">
          <div className="sun-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="sun-icon"
            >
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </g>
            </svg>
          </div>
          <div className="toggle-button" />
          <div className="moon-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="moon-icon"
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79" />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}

export default function ({
  page, piece, global, home, localizations, outerLayout,
  title, bodyClass, pageTitle, breadcrumbs, main
}, {
  Extend, apos, __t
}) {
  // The `title` prop is how a page template overrides the document title —
  // the JSX equivalent of Nunjucks `{% block title %}`.
  const docTitle = title || defaultTitle(page, piece);

  if (!docTitle) {
    apos.util.log('Looks like you forgot to override the title block in a template that does not have access to an Apostrophe page or piece.');
  }

  return (
    <Extend
      templateName={outerLayout}
      title={docTitle ? `${docTitle} - ${siteTitle(global)}` : siteTitle(global)}
      bodyClass={bodyClass || ''}
      extraHead={<ExtraHead apos={apos} />}
      main={
        <>
          <Header
            home={home}
            page={page}
            global={global}
            localizations={localizations}
            apos={apos}
            __t={__t}
          />
          <MobileNav
            home={home}
            page={page}
            localizations={localizations}
            apos={apos}
            __t={__t}
          />
          {breadcrumbs !== undefined ? breadcrumbs : <Breadcrumbs page={page} piece={piece} />}
          {pageTitle !== undefined ? pageTitle : <PageTitle page={page} piece={piece} />}
          <div className="layout">
            <main>
              {main}
            </main>
          </div>
          <Footer home={home} __t={__t} />
        </>
      }
      extraBody={<ModeSwitch __t={__t} />}
    />
  );
}
