import { useTourStore } from '../stores/useTourStore';

export function initAnalyticsTracking() {
  const store = useTourStore();
  store.$onAction(({
    name, args, after
  }) => {
    after((returnValue) => {
      const [ tourElement, val ] = args;
      const ignoredActions = [
        'getTourValue',
        'clearRunning',
        'persistToLocalStorage'
      ];

      if (ignoredActions.includes(name)) {
        return;
      }

      let event;

      console.log(name, tourElement, val);

      if (tourElement) {
        event = `${tourElement}: ${val}`;
      } else {
        event = name;
      }

      console.log(`want to track ${event}`);

      window.umami.track(event);
    });
  });
}
