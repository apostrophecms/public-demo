<script setup>
import introJs from 'intro.js';
import { ref, onMounted, computed, watch } from 'vue'
import { useModalStore } from 'Modules/@apostrophecms/ui/stores/modal';
// import { useLocalStorageWithExpiry } from '../composables/useLocalStorageWithExpiry';
import introFlow from '../lib/flows/intro';

const INTRO_TTL_MS = 30 * 24 * 60 * 60 * 1000;
// const storage = useLocalStorageWithExpiry('apos:tour', { defaultTtlMs: INTRO_TTL_MS });
const hints = [
  { hint: 'First hint', element: '[data-apos-test="localePickerTrigger"]' },
  { hint: 'Second hint', element: '.apos-admin-bar__logo'},
  { hint: 'third hint', element: '.site-logo'},
  { hint: 'make the thing', element: '.apos-modal__header__main .apos-button--primary', modal: true},
];
const flows = ref([
  introFlow
]);

const store = useModalStore();
const stack = computed(() => store.stack);

watch(stack, async (newStack, oldStack) => {
  console.log('STACK CHANGE');
  console.log(newStack);
})

const modalLaunched = (modal) => {
  console.log('launched', modal);
  hint.removeHints();
  setTimeout(() => {
  hint.setOptions({
    hints: hints.filter(h => h.modal)
  });
  hint.addHints();
  }, 50);
}

const modalClosed = (modal) => {
  console.log('closed', modal);
}

const hint = introJs.hint();

onMounted(() => {
  apos.bus.$on('modal-launched', modalLaunched);
  apos.bus.$on('modal-resolved', modalClosed);
  
  setTimeout(() => {

    // introFlow(introJs);
    
    hint.setOptions({
      hints: hints.filter(h => !h.modal)
    });

    hint.addHints();
  }, 2000);
  // storage.clearExpired();
  // const introCompleted = storage.getItem('intro');
  // if (!introCompleted) {
  //   // intro(introJsConstructor);
  // }

  // console.log(test);
  // storage.setItem('stuTest', 'fun');
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

