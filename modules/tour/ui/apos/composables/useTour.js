import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useTourStore } from '../stores/useTourStore';

export function useTour() {
  const store = useTourStore();
  const { data } = storeToRefs(store);

  function getValue(key) {
    return store.get(key);
  }

  function setValue(key, value) {
    store.set(key, value);
  }

  function resetStore() {
    store.reset();
  }

  // optional: expose a reactive ref for a specific key
  function useKey(key) {
    return computed({
      get: () => store.get(key),
      set: (val) => store.set(key, val)
    });
  }

  return {
    data,
    getValue,
    setValue,
    resetStore,
    useKey
  };
}
