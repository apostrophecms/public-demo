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

    setTourValue(key, value) {
      this.data[key] = value;
      this.persistToLocalStorage();
    },

    deleteTourValue(key) {
      delete this.data[key];
      this.persistToLocalStorage();
    },

    resetTour() {
      this.data = {};
      this.persistToLocalStorage();
    },

    disableTour() {
      this.data.disabled = true;
      this.persistToLocalStorage();
    },

    clearRunningAction() {
      for (const key in this.data) {
        if (this.data[key] === 'running') {
          delete this.data[key];
        }
      }
      this.persistToLocalStorage();
    }
  }
});
