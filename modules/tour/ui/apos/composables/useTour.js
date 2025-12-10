import { storeToRefs } from 'pinia';
import { useTourStore } from '../stores/useTourStore';

export function useTour() {
  const store = useTourStore();
  const { data } = storeToRefs(store);

  function getTourValue(key) {
    return store.get(key);
  }

  function setTourValue(key, value) {
    store.setTourValue(key, value);
  }

  function resetTour() {
    store.resetTour();
  }

  function clearRunning() {
    store.clearRunningAction();
  }

  function disableTour() {
    store.disableTour();
  }

  return {
    data,
    getTourValue,
    setTourValue,
    resetTour,
    disableTour,
    clearRunning
  };
}
