export default () => {

  const VALIDTARGETS = [
    'button',
    '.apos-table__cell',
    '.apos-media-uploader__inner',
    '.apos-input--choice',
    'input[class^="apos"]',
    'select[class^="apos"]',
    '.apos-rich-text-editor__editor',
    '.apos-area-widget-controls--modify',
    '.apos-locale-item',
    '.apos-doc-locales__switcher'
  ];

  const RULES = [
    {
      match: t => t.closest('.apos-admin-bar'),
      label: () => 'AdminBar'
    },
    {
      match: t => t.matches('.apos-locale-item') || t.closest('.apos-locale-item'),
      label: () => 'SelectLocaleToLocalizeTo'
    },
    {
      match: t => t.closest('.apos-media-manager'),
      label: () => 'MediaManager'
    },
    {
      match: t => t.closest('.apos-area-widget-controls--modify'),
      label: () => 'WidgetTools'
    },
    {
      match: t => t.closest('.apos-tag-list'),
      label: () => 'FilterByTag'
    },
    {
      match: t => t.closest('.apos-manager-toolbar'),
      label: () => 'ManagerToolbar'
    },
    {
      match: t => t.closest('.apos-modal-tabs'),
      label: () => 'SchemaTab'
    },
    {
      match: t => t.closest('.apos-rich-text-editor__editor'),
      label: t => {
        if (t.matches('option')) {
          return `RichTextWidget:${t.textContent}`;
        }
        return 'RichTextWidget';
      },
      suppressLabel: true
    },
    {
      match: t => t.closest('.apos-filters-menu__set'),
      label: t => `FilterChoice:${t.parentElement?.textContent}`,
      suppressLabel: true
    },
    {
      match: t => t.closest('[data-apos-test="selectAll"]'),
      label: () => 'SelectAll',
      suppressLabel: true
    },
    {
      match: t =>
        t.closest('.apos-input-wrapper') ||
        t.closest('.apos-field__wrapper'),
      label: t => {
        const field = t.closest('.apos-field');
        const fieldLabel =
          field?.querySelector('.apos-field_label-info')?.textContent;

        let value = '';

        if (t.matches('.apos-button__label') || t.matches('option')) {
          value = t.textContent;
        } else if (t.classList.contains('apos-input--choice')) {
          value = t.parentElement?.textContent;
        }

        return `SchemaField:${fieldLabel}:${value}`;
      },
      suppressLabel: true
    },
    {
      match: t => t.closest('[data-apos-test-context-menu-item]'),
      label: () => 'ContextMenuItem'
    },
    {
      match: t => t.closest('.apos-media-manager-display__select'),
      label: () => 'ManageImage'
    },
    {
      match: t => t.closest('.apos-field--search'),
      label: () => 'Search'
    },
    {
      match: t => t.closest('.apos-table__cell'),
      label: () => 'ManagerTableCell'
    },
    {
      match: t => t.closest('.apos-media-uploader'),
      label: () => 'MediaUploader',
      suppressLabel: true
    },
    {
      match: t => t.closest('.apos-area-menu__button'),
      label: () => 'AddContentItem'
    },
    {
      match: t =>
        t.closest('.apos-admin-locales') ||
        t.matches('.apos-doc-locales__switcher') ||
        t.closest('.apos-doc-locales__switcher'),
      label: () => 'LocaleSwitcher'
    },
    {
      match: t =>
        t.closest('[data-apos-test="authenticatedUserMenuTrigger"]'),
      label: () => 'UserSettingsMenu'
    },
    {
      match: t => t.closest('.apos-button--icon-only'),
      label: t => t.closest('.apos-button--icon-only')?.textContent,
      suppressLabel: true
    }
  ];

  const isValidTarget = (t) =>
    VALIDTARGETS.some(sel => t.matches(sel) || t.closest(sel));

  apos.util.onReadyAndRefresh(() => {

    function handleClicks(e) {
      try {
        const t = e.target;
        if (!isValidTarget(t)) {
          return;
        }

        const parts = [ 'AposClick' ];
        let allowText = true;

        for (const rule of RULES) {
          if (!rule.match(t)) {
            continue;
          }

          const label = rule.label(t);

          if (label) {
            parts.push(label);
          }

          if (rule.suppressLabel) {
            allowText = false;
          }
        }

        if (allowText && t.textContent) {
          parts.push(t.textContent);
        }

        const msg = pascalCase(
          parts.join(':')
            .replace(/:+$/, '')
            .replace(/\*/g, '')
        );

        window.umami.track(msg);
      } catch (_) {
        //
      }
    }

    if (!apos._demoTracking) {
      document.addEventListener('click', handleClicks, { capture: true });
      apos._demoTracking = true;
    }

    function pascalCase(str) {
      return str
        .replace(/[_\-]+/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => w.toUpperCase())
        .replace(/\s+/g, '');
    }
  });
};
