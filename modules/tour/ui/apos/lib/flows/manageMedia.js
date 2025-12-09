import {
  wait
} from '../helpers.js';

const flow = {
  id: 'manageMedia',
  componentName: 'AposMediaManager',
  moduleName: [ '@apostrophecms/image' ],

  async run(introJs, setValue) {
    let skipped = false;
    setValue(flow.id, 'running');

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

    const tours = [
      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          tooltipClass: 'large',
          steps: [
            {
              title: 'Media manager',
              intro:
                'The media manager show your site\'s existing media'
            }
          ]
        },
        onExit: () => tours[1].instance.start()
      },
      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          scrollToElement: false,
          steps: [
            {
              title: 'Upload new media',
              element: '.apos-modal .apos-media-uploader',
              intro: 'Upload new media by dropping files here, or click the cell to open the file browser.'
            },
            {
              title: 'Filter by tag',
              element: '.apos-modal .apos-tag-list',
              intro: 'Filter media by tags'
            }
          ]
        },
        onExit: async () => {
          document
            .querySelectorAll('.apos-modal .apos-media-manager-display__cell button')[14]
            .click();
          document.querySelector('.apos-modal__body-main').scrollTop = 0;
          await wait(100);
          tours[2].instance.start();
        }
      },
      {
        options: {
          showBullets: false,
          exitOnEsc: false,
          scrollToElement: false,
          steps: [
            {
              title: 'Selecting media',
              element: '.apos-modal .apos-is-selected',
              scrollToElement: false,
              intro: 'Clicking a piece of media will select it.'
            },
            {
              title: 'Editing media',
              scrollToElement: false,
              element: '.apos-modal .apos-media-manager__sidebar',
              intro: 'Once you\'ve selected a piece of media and editor will appear on the right'
            }
          ]
        },
        onExit: async () => {
          setValue(flow.id, 'complete');
        }
      }
    ];

    tours.forEach(t => (t.instance = createTour(t)));

    await wait(300);
    document.querySelector('.apos-modal__body-main').scrollTop = 0;
    const first = tours[0].instance;
    first.start();
  }
};

export default flow;
