import { defineStore } from 'pinia';

export const useTourStore = defineStore('tour', {
  state: () => ({
    data: JSON.parse(localStorage.getItem('apos-demo-tour')) || {}
  }),

  getters: {
    get: (state) => (key) => state.data[key]
  },

  actions: {
    persistToLocalStorage() {
      localStorage.setItem('apos-demo-tour', JSON.stringify(this.data));
    },

    set(key, value) {
      this.data[key] = value;
      this.persistToLocalStorage();
    },

    remove(key) {
      delete this.data[key];
      this.persistToLocalStorage();
    },

    reset() {
      this.data = {};
      this.persistToLocalStorage();
    }
  }
});
