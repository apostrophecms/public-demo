import {
  wait,
  typewriter,
  selectEditable,
  scrollToTargetAdjusted
} from '../helpers.js';

const flow = {
  id: 'intro',
  el: '.home-page',

  async run(introJs, setValue) {
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
                'This is the admin bar. Here you can access content, manage media, edit user settings, and more. '
            },
            {
              title: 'Pages',
              element: '.apos-admin-bar__item',
              intro:
                'The pages menu let\'s you manage pages and reorganize your page tree'
            },
            {
              title: 'Global settings',
              element:
                '[data-apos-test="@apostrophecms/global:singleton-editorTrigger"]',
              intro: 'Edit the global settings for your site.'
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
              intro: 'Manage your media library here.'
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
              intro:
                'This menu shows the available locales for your current page. Click one to switch to that locale.'
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
              intro: 'Click into content on the page to begin editing'
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
                'Click the plus buttons to add additional widgets to the page'
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
              intro: 'The document context menu allows you edit additional details of your page, discard the current draft, localize the page to another language, and more.'
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
                'Those are the basics of working in ApostropheCMS. Look for pulsing bubbles to get more information about using ApostropheCMS\'s UI. Have fun!'
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
        setValue('disabled', true);
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
