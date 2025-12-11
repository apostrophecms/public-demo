import {
  wait
} from '../helpers.js';

const flow = {
  id: 'editPieceFlow',
  componentName: 'AposDocEditor',
  moduleName: [ 'article', 'topic', '@apostrophecms/page' ],

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
              title: 'Content tabs',
              element: '.apos-modal .apos-modal__rail--left',
              intro: 'Content is organized into tabs. Clicking tabs will reveal the content within. '
            },
            {
              title: 'Save changes',
              element: '.apos-modal .apos-button-split--type-primary',
              intro: 'Once you\'ve made edits you can use this button to publish your work.'
            }
          ]
        },
        onExit: () => setValue(flow.id, 'complete')
      }
    ];

    tours.forEach(t => (t.instance = createTour(t)));

    await wait(1000);
    const first = tours[0].instance;
    first.start();
  }
};

export default flow;
