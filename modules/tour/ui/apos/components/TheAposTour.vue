<script setup>
import introJs from 'intro.js/dist/intro.js';
import { ref, onMounted, computed, watch } from 'vue'
import { useModalStore } from 'Modules/@apostrophecms/ui/stores/modal';
import { useTour } from '../composables/useTour';
import { initAnalyticsTracking } from '../lib/analyticsTracking';

import introFlow from '../lib/flows/intro';
import managePieceFlow from '../lib/flows/managePiece';
import editPieceFlow from '../lib/flows/editPiece';
import manageMediaFlow from '../lib/flows/manageMedia';
import managePagesFlow from '../lib/flows/managePages';
import hints from '../lib/hints'

const flows = ref({
  introFlow,
  managePieceFlow,
  editPieceFlow,
  manageMediaFlow,
  managePagesFlow
});

const modalStore = useModalStore();
const {
  setTourValue,
  getTourValue,
  clearRunning,
  disableTour,
} = useTour();
const activeModal = computed(() => modalStore.activeModal);
const isTourDisabled = computed(() => !!getTourValue('disabled'));
const hint = introJs.hint();

hint.onHintClose(hint => { 
  console.log('onHintClose');
  setTourValue(hint.id, 'complete');
});

hint.onHintClick(hint => {
  document.addEventListener('click', () => {
    setTourValue(hint.id, 'complete');
    refreshHints();
  }, { once: true });
  document.querySelector(`[data-hint-id="${hint.id}"]`).addEventListener('click', () => {
    setTourValue(hint.id, 'complete');
    refreshHints();
  }, { once: true });
});

watch(activeModal, async (newModal) => {
  refreshTour();
})

const refreshTour = () => {
  if (!isTourDisabled.value) {
    refreshHints();
    refreshFlows();
  } else {
    hint.destroy();
  }
}

const refreshHints = () => {
  hint.destroy();
  setTimeout(() => {
    hint.setOptions({
      hints: hints
        .filter(h => activeModal.value ? h.modal : !h.modal)
        .filter(h => !getTourValue(h.id))
    });
    hint.render();
  }, 50);
};

const refreshFlows = () => {
  // do not fire in breakpoint preview mode
  if (!document.querySelector('[data-breakpoint-preview-mode]')) {
    for (const key in flows.value) {
      // do not fire if already run/running
      if (!getTourValue(flows.value[key].id)) {
        // further state detection
        if (
          (flows.value[key].el && document.querySelector(flows.value[key].el))
          || (
            flows.value[key].componentName
            && flows.value[key].moduleName
            && flows.value[key].moduleName.includes(activeModal.value?.props?.moduleName)
            && activeModal.value?.componentName === flows.value[key].componentName
          )
        ) {
          flows.value[key].run(introJs, setTourValue, disableTour);
        }
      }
    }
  }
}

onMounted(() => {

  // Reset any unresolved flows
  clearRunning();

  // Initiate umami tracking
  initAnalyticsTracking();

  apos.bus.$on('admin-menu-click', (item) => {
    if (item === 'tour-settings') {
      apos.modal.execute('AposModalTourSettings', {});
    }
  });

  apos.bus.$on('refresh-tour', (item) => {
    refreshTour();
  });
  
  setTimeout(() => {
    refreshTour();
  }, 2000);

});
</script>


<style lang="scss">
  @import 'intro.js/dist/introjs.css';

  .introjs-tour-active {
    overflow: hidden;
  }

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

  .introjs-tour {
    z-index: 9999999;
  }

  .introjs-hint-dot {
    width: 70px;
    left: -28px;
  }

  .introjs-helperLayer {
    box-shadow: rgba(33, 33, 33, 0.25) 0px 0px 1px 2px,
      rgba(33, 33, 33, 0.25) 0px 0px 0px 5000px !important;
  }

  .introjs-button {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    padding: 6px 12px 7px;
    color: rgb(255, 255, 255);
    background-color: rgb(88, 77, 239);
    transition: background-color 100ms;
    border: 0;
    text-shadow: none;

    &:not(.introjs-disabled):focus, &:not(.introjs-disabled):hover {
      background-color: rgb(59, 49, 193);
      outline: 1px solid rgb(88, 77, 239);
      outline-offset: 1px;
      color: rgb(255, 255, 255);
      box-shadow: none;
      border: 0;
    }

    &.introjs-disabled {
      background-color: #dddbdb;
      color: #606060;
    }
  }

  .introjs-tooltipbuttons {
    border-top: none;
    padding: 20px;
  }

  .introjs-tooltip-header {
    padding-top: 20px;
  }

  .introjs-tooltip-title {
    text-align: left;
    font-family: var(--default-font) !important;
    letter-spacing: 0px;
    line-height: 1;
  }

  .introjs-tooltip {
    border-radius: 12px;
    min-width: 300px;
    max-width: 400px;
  }

  .introjs-skipbutton {
    font-size: 19px;
    font-weight: 400;
  }

  .introjs-tooltiptext {
    padding: 0px 20px 20px;
  }

  .introjs-hints .introjs-tooltiptext {
    padding: 25px;

    .introjs-tooltiptext {
      padding: 0;
      margin-bottom: 20px;
    }
  }

  .introjs-tooltipbuttons {
    padding-top: 0;
  }

  .introjs-tooltip.large {
    min-width: 590px;
    max-width: none;

    .introjs-tooltip-header {
      padding: 40px 30px 0;
    }

    .introjs-tooltip-title {
      font-size: 1.5rem;
    }

    .introjs-tooltiptext {
      padding-right: 30px;
      padding-left: 30px;
      font-size: 1.1rem;
      line-height: 1.3;
    }
  }

</style>
