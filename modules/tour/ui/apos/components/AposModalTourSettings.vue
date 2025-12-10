<template>
  <AposModal
    :modal="modal"
    class="apos-tour-settings"
    v-on="{ esc: close }"
    @inactive="modal.active = false"
    @show-modal="modal.showModal = true"
  >
    <template #main>
      <AposModalBody>
        <template #bodyMain>
          <div class="apos-tour-settings__header">
            <h2 class="apos-tour-settings__heading">
              Tour Settings
            </h2>
            <Close class="apos-tour-settings__close" tabindex="0" :title="$t('apostrophe:close')" :size="18"
              @click.prevent="close" />
          </div>

          <div class="apos-tour-settings__content">
            <div class="apos-tour-settings__toggle-wrapper">
              <p class="apos-tour-settings__description">
                Resetting the tour may require a page refresh.
              </p>

              <div class="apos-tour-settings__buttons">
                <AposButton type="default" label="Disable Tour" @click="disable" />
                <AposButton type="primary" label="Reset Tour" @click="reset" />
              </div>
            </div>
          </div>
        </template>
      </AposModalBody>
    </template>
  </AposModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Close from '@apostrophecms/vue-material-design-icons/Close.vue';
import { useTour } from '../composables/useTour';

const { setTourValue, disableTour, resetTour } = useTour();

const modal = ref({
  active: false,
  type: 'overlay',
  showModal: false,
  disableHeader: true
});

onMounted(() => {
  modal.value.active = true;
});

function close() {
  modal.value.showModal = false;
}

function reset() {
  resetTour();
  close();
  apos.notify('Tour reset. Refresh the page to trigger the tour', {
    type: 'success',
    dismiss: true,
    icon: 'bullhorn-icon'
  });
}

function disable() {
  disableTour();
  close();
  apos.notify('Tour disabled. Re-enable it through the Tour menu in the admin bar', {
    type: 'success',
    dismiss: true,
    icon: 'bullhorn-icon'
  });
}
</script>

<style lang="scss"
  scoped>
  .apos-tour-settings {
    z-index: $z-index-modal;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.apos-modal__inner) {
      inset: auto;
      max-width: 700px;
      height: auto;
      border-radius: 15px;
    }

    :deep(.apos-modal__overlay) {
      .apos-modal+.apos-tour-settings & {
        display: block;
      }
    }

    :deep(.apos-modal__body) {
      padding: 20px;
    }

    :deep(.apos-modal__body-main) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .apos-tour-settings__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px 20px;
    border-bottom: 1px solid var(--a-base-8);
  }

  .apos-tour-settings__heading {
    @include type-title;

    & {
      line-height: var(--a-line-tall);
      margin: 0;
    }
  }

  .apos-tour-settings__close {
    align-self: center;
    height: 18px;
    cursor: pointer;
  }

  .apos-tour-settings__toggle-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: $spacing-base;
  }

  .apos-tour-settings__buttons {
    display: flex;
    gap: 1rem;
    
    :deep(.apos-button) {
      min-width: 140px;
    }
  }

  .apos-tour-settings__description {
    @include type-base;

    & {
      margin: 1.3rem 0 1.2rem 0;
      line-height: var(--a-line-tall);
      max-width: 355px;
      color: var(--a-text-primary);
    }
  }
</style>
