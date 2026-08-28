<template>
  <video
    v-if="src"
    :src="src"
    class="apos-video-preview"
    muted
    playsinline
    preload="metadata"
    @mouseenter="play"
    @mouseleave="pause"
  />
  <span
    v-else
    class="apos-video-preview__empty"
  >—</span>
</template>

<script>
import AposCellMixin from 'Modules/@apostrophecms/ui/mixins/AposCellMixin';

export default {
  name: 'AposCellVideoPreview',
  mixins: [ AposCellMixin ],
  computed: {
    src() {
      // `header.name` is `video`; this returns the stored attachment object.
      const attachment = this.get(this.header.name);
      if (!attachment || !attachment._id) {
        return null;
      }
      // `apos.util.attachmentUrl` builds the canonical uploadfs URL. The
      // "#t=0.1" fragment nudges the browser to paint the first frame as a
      // still thumbnail while the video stays paused.
      return `${apos.util.attachmentUrl(attachment)}#t=0.1`;
    }
  },
  methods: {
    play(event) {
      // play() rejects if the pointer leaves before playback starts; ignore.
      const promise = event.target.play();
      if (promise) {
        promise.catch(() => {});
      }
    },
    pause(event) {
      event.target.pause();
      // Return to the first frame so the still thumbnail comes back.
      event.target.currentTime = 0;
    }
  }
};
</script>

<style scoped>
.apos-video-preview {
  display: block;
  height: 48px;
  width: auto;
  max-width: 120px;
  border-radius: 4px;
  background-color: var(--a-base-9);
}

.apos-video-preview__empty {
  color: var(--a-base-5);
}
</style>
