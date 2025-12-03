<script setup>
import introJs from 'intro.js';
import { ref, onMounted, computed, watch } from 'vue'
import { useModalStore } from 'Modules/@apostrophecms/ui/stores/modal';
import { useTour } from '../composables/useTour';

import introFlow from '../lib/flows/intro';
import hints from '../lib/hints'

const flows = ref({
  introFlow
});

const modalStore = useModalStore();
const { setValue, getValue, data, resetStore } = useTour();
// const modalStack = computed(() => modalStore.stack);
const activeModal = computed(() => modalStore.activeModal);
const hint = introJs.hint();

hint.onhintclose(hint => { 
  setValue(hint.id, true);
});

watch(activeModal, async (newModal) => {
  refreshHints();
})

const refreshHints = () => {
  hint.removeHints();
  setTimeout(() => {
    hint.setOptions({
      hints: getViableHints()
    });
    hint.addHints();
  }, 50);
};

const refreshFlows = () => {
  for (const key in flows.value) {
    if (document.querySelector(flows.value[key].el)) {
      flows.value[key].run(introJs, setValue);
    }
  }
}

const getViableHints = () => {
  return hints
    .filter(h => activeModal.value ? h.modal : !h.modal)
    .filter(h => !getValue(h.id))
}

const resetHandler = () => {
  window.addEventListener('keydown', e => {
    if (e.metaKey && e.shiftKey && e.key === '0') {
      e.preventDefault();
      resetStore();
      console.log('Store reset')
    }
  });
}

onMounted(() => {
  console.log('Store at startup', data.value);
  resetHandler();
  
  setTimeout(() => {
    refreshFlows();
    refreshHints();
  }, 2000);

});
</script>


<style lang="scss">
  @import 'intro.js/introjs.css';

  .introjs-tour,
  .introjs-hints {
    pointer-events: none;
    z-index: 999999;
    position: absolute;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;

    & > * {
      pointer-events: auto;
    }
  }
</style>

