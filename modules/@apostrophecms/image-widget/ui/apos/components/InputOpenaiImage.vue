<template>
  <AposInputWrapper
    :modifiers="modifiers" :field="field"
    :error="effectiveError" :uid="uid"
    :display-options="displayOptions"
  >
    <template #body>
      <div :class=classes>
        <p>Prompt</p>
        <textarea v-model="prompt"></textarea>
        <div>
          <button :disabled="!prompt.length" class="generate" @click.stop.prevent="generate">Generate</button>
          <button :disabled="!next" class="clear" @click.stop.prevent="clear">Clear</button>
        </div>
        <p v-if="generateError">
          An error occurred.
        </p>
        <p v-if="busy">
          The 🤖 is thinking...
        </p>
        <div v-if="next">
          <p>Preview</p>
          <img :src="imageUrl" />
        </div>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';

export default {
  name: 'InputOpenaiImage',
  mixins: [ AposInputMixin ],
  data() {
    return {
      prompt: '',
      generateError: false,
      busy: false,
      next: null,
      previewUrl: null
    };
  },
  computed: {
    classes() {
      return {
        'apos-input-wrapper': 1,
        busy: this.busy
      };
    },
    imageUrl() {
      return this.previewUrl;
    }
  },
  methods: {
    validate(value) {
      console.log('validating:', value);
      if (this.field.required) {
        if (!value) {
          return 'required';
        }
      }
      return false;
    },
    clear() {
      this.next = null;
    },
    async generate() {
      this.busy = true;
      this.generateError = false;
      try {
        const image = await apos.http.post('/api/v1/@apostrophecms/image-widget/generate-image?aposMode=draft', {
          body: {
            prompt: this.prompt
          }
        });
        console.log(image);
        console.log('assigning to next');
        this.previewUrl = image.attachment._urls.full;
        this.next = {
          prompt,
          imageId: image._id
        };
      } catch (e) {
        this.generateError = true;
      } finally {
        this.busy = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
  }
</style>
