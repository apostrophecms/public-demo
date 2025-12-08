import { storeToRefs } from 'pinia';
import { useTourStore } from '../stores/useTourStore';

export function useTour() {
  const store = useTourStore();
  const { data } = storeToRefs(store);

  function getTourValue(key) {
    return store.get(key);
  }

  function setTourValue(key, value) {
    store.set(key, value);
  }

  function resetTourStore() {
    store.reset();
  }

  function clearRunning() {
    store.clearRunningAction();
  }

  function disableTour() {
    store.reset();
  }

  return {
    data,
    getTourValue,
    setTourValue,
    resetTourStore,
    disableTour,
    clearRunning
  };
}
