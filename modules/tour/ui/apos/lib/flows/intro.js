import {
  wait,
  typewriter,
  selectEditable,
  scrollToTargetAdjusted
} from '../helpers.js';

const flow = {
  id: 'introFlow',
  el: '.home-page',

  async run(introJs, setValue, disableTour) {
    let skipped = false;
    setValue(flow.id, 'running');

    // ---------- util: build standardized tour ----------
    const createTour = cfg => {
      const tour = introJs.tour();
      tour.setOptions(cfg.options);

      tour.onSkip(async () => {
        skipped = true;
        setValue(flow.id, 'skipped');
        if (cfg.onSkip) {
          await cfg.onSkip(tour);
        }
      });

      tour.onExit(async () => {
        if (!skipped) {
          await wait(50);
          if (cfg.onExit) {
            await cfg.onExit(tour);
          }
        }
      });

      return tour;
    };

    // ---------- declarative config for all tours ----------

    const tours = [
      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          tooltipClass: 'large welcome',
          element: 'body',
          doneLabel: 'Let\'s Go',
          steps: [
            {
              title: 'Welcome to the ApostropheCMS demo tour',
              intro:
                'Welcome aboard! This quick tour will show you how to create, edit, and organize content in ApostropheCMS. You’ll see where things live, how to make changes safely, how to edit content in-context, and how to publish when you’re ready.'
            }
          ]
        },
        onExit: () => tours[1].instance.start()
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'The admin bar',
              element: '.apos-admin-bar',
              intro:
                'The admin bar gives you access to content, allows you to manage media, edit user settings, and more. '
            },
            {
              title: 'Pages',
              element: '.apos-admin-bar__item',
              intro:
                'The Pages Manager let\'s you create pages, edit existing ones, and reorganize your page tree.'
            },
            {
              title: 'Global settings',
              element:
                '[data-apos-test="@apostrophecms/global:singleton-editorTrigger"]',
              intro: 'Global Settings let you manage site-wide content and options like logos, navigation, and contact details from one central, easy-to-update location.'
            }
          ]
        },
        onExit: async () => {
          document
            .querySelector('[data-apos-test="media-dropdown"] button')
            .click();
          await wait(50);
          tours[2].instance.start();
        }
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'Manage images and media',
              element: '[data-apos-test="context-menu-content"]',
              intro: 'Click here to open the Media Manager, where you can upload, organize, and manage all of your images and files.'
            }
          ]
        },
        onExit: async () => {
          document.body.click();
          document
            .querySelector('[data-apos-test="localePickerTrigger"] button')
            .click();
          await wait(50);
          tours[3].instance.start();
        }
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'Easily switch locales',
              element: '.apos-context-menu__pane',
              intro: 'Sites can be localized into many languages. The locale switcher lets you view the site in a specific language so you can manage that locale\'s content.'
            }
          ]
        },
        onExit: () => {
          if (window.apos?.adminBar?.editMode) {
            selectEditable('.apos-rich-text-editor__editor', 'h2');
            typewriter('This website is yours!');
            document.querySelector('.apos-rich-text-editor__editor').click();
            tours[5].instance.start();
          } else {
            tours[4].instance.start();
          }

        }
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'Enable Edit Mode',
              element: '.apos-admin-bar__control-set--mode-and-settings button',
              intro: 'Click the Edit button to begin editing the page.'
            }
          ]
        },
        onExit: async () => {
          document.querySelector('.apos-admin-bar__control-set--mode-and-settings button').click();
          await wait(1400);
          selectEditable('.apos-rich-text-editor__editor', 'h2');
          typewriter('This website is yours!');
          document.querySelector('.apos-rich-text-editor__editor').click();
          tours[5].instance.start();
        }
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'Edit content in-context',
              element: '.apos-area-widget-wrapper',
              intro: 'Hover and click into content on the page to begin editing and re-arranging your content.'
            }
          ]
        },
        onExit: async () => {
          document.querySelectorAll('.apos-area-widget-guard')[9].click();
          await wait(200);
          scrollToTargetAdjusted(
            '.apos-area-widget-controls--add--top.apos-is-visible button',
            null,
            230
          );
          await wait(200);
          tours[6].instance.start();
        }
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'Add content to the page',
              element:
                '.apos-area-widget-controls--add--top.apos-is-visible button',
              intro:
                'Click the PLUS buttons to add additional widgets to the page. These appear above and below any widget.'
            }
          ]
        },
        onExit: async () => {
          document.body.click();
          document.querySelectorAll('.apos-area-widget-guard')[9].click();
          await wait(200);
          document
            .querySelector(
              '.apos-area-widget-controls--add--top.apos-is-visible button'
            )
            .click();
          await wait(200);
          tours[7].instance.start();
        }
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'Adding content',
              element: '.apos-modal__inner',
              intro: 'Select a widget from the menu to add it to the page',
              position: 'top-middle-aligned'
            }
          ]
        },
        onExit: async () => {
          document.querySelector('.apos-modal__overlay').click();
          await wait(100);
          document.querySelector('.apos-admin-bar__control-set__group [data-apos-test="contextMenuTrigger"] button').click();
          await wait(100);
          tours[8].instance.start();
        }
      },

      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          steps: [
            {
              title: 'Manage your document',
              element: '[data-apos-test="context-menu-content"]',
              intro: 'From the document context menu you can edit additional details of your page, discard the current draft, localize the page to another language, and more.'
            },
            {
              title: 'Publish your changes',
              element: '.apos-admin-bar__btn.apos-admin-bar__context-button',
              intro: 'When you\'re happy with your content clicking Publish will push it to the live site.'
            }
          ]
        },
        onExit: () => {
          tours[9].instance.start();
        }
      },

      {
        options: {
          showBullets: false,
          tooltipClass: 'large',
          exitOnEsc: false,
          doneLabel: 'Explore ApostropheCMS',
          steps: [
            {
              title: 'Explore ApostropheCMS',
              intro:
                'Those are the basics of working in ApostropheCMS. Look for pulsing bubbles for more information about using ApostropheCMS\'s UI. Have fun!'
            }
          ]
        },
        onExit: () => {
          setValue(flow.id, 'complete');
        }
      }
    ];

    tours.forEach(t => (t.instance = createTour(t)));

    const first = tours[0].instance;
    first.start();
    await wait(50);

    // ---------- custom skip button ----------
    const next = document.querySelector('.introjs-nextbutton');
    const container = document.querySelector('.introjs-tooltipbuttons');

    if (next && container) {
      const skip = next.cloneNode(true);
      skip.innerText = 'Skip tour';
      skip.style.float = 'left';
      skip.style.backgroundColor = 'transparent';
      skip.style.color = '#3b31c1';

      skip.addEventListener('click', () => {
        skipped = true;
        disableTour();
        first.exit();
        apos.bus.$emit('refresh-tour', {});
        apos.notify('Tour disabled. Re-enable it through the Tour menu in the admin bar', {
          type: 'success',
          dismiss: true,
          icon: 'bullhorn-icon'
        });
      });

      container.insertBefore(skip, next);
    }
  }
};

export default flow;
