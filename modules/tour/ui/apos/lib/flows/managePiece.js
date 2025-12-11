import {
  wait
} from '../helpers.js';

const flow = {
  id: 'managePieceFlow',
  componentName: 'AposDocsManager',
  moduleName: [ 'article', 'topic' ],

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
          steps: [
            {
              title: 'Create new content',
              element: '.apos-modal .apos-button.apos-button--primary',
              intro: 'Click here to create a new piece of content.'
            },
            {
              title: 'Edit existing content',
              element: '.apos-modal__body-main',
              intro: 'The table shows your site\'s existing content. Click an item to edit it.'
            },
            {
              title: 'Find content',
              element: '.apos-modal .apos-manager-toolbar.apos-toolbar .apos-toolbar__group--right',
              intro: 'Filter and search this content type using the filter tools.'
            },
            {
              title: 'Apply batch actions',
              element: '.apos-modal .apos-manager-toolbar.apos-toolbar .apos-toolbar__group--left',
              intro: 'You can edit content in bulk using the batch action tools.'
            }
          ]
        },
        onExit: () => setValue(flow.id, 'complete')
      }
    ];

    tours.forEach(t => (t.instance = createTour(t)));

    await wait(300);
    const first = tours[0].instance;
    first.start();
  }
};

export default flow;
