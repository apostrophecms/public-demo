import {
  wait
} from '../helpers.js';

const flow = {
  id: 'managePagesFlow',
  componentName: 'AposPagesManager',
  moduleName: [ '@apostrophecms/page' ],

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
              title: 'Create a new page',
              element: '.apos-modal .apos-button.apos-button--primary',
              intro: 'Click here to create a new page.'
            },
            {
              title: 'Manage the page tree',
              element: '.apos-modal .apos-tree__list',
              intro: 'The page tree shows you the structure of your site. Drag and drop the tree nodes to nest or re-order pages.'
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
