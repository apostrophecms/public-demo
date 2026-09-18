<template>
  <select
    class="apos-wysiwyg-inline-select"
    :value="next"
    :disabled="readOnly"
    :aria-label="placeholder"
    @change="update($event.target.value)"
  >
    <option
      v-if="!field.required"
      value=""
    >
      {{ placeholder }}
    </option>
    <option
      v-for="choice in field.choices"
      :key="choice.value"
      :value="choice.value"
    >
      {{ $t(choice.label) }}
    </option>
  </select>
</template>

<script>
// Edits an `inlineSelect` field in place.
//
// Nothing here is debounced. A select changes once, deliberately, when the
// user picks something, so `update` saves it right away — there is no such
// thing as a half-typed choice to wait out, and so nothing to flush on blur
// either.
//
// The choices come from `field`, which is the schema field exactly as the
// server composed it. The editor never has to ask the server anything.
import AposWysiwygInputMixin from 'Modules/@apostrophecms/schema/mixins/AposWysiwygInputMixin';

export default {
  name: 'AposWysiwygInputInlineSelect',
  mixins: [ AposWysiwygInputMixin ]
};
</script>

<style lang="scss" scoped>
  // Editing should feel like changing a word on the page, not filling in a
  // form, so take the page's own typography and none of the form chrome
  .apos-wysiwyg-inline-select {
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    text-align: inherit;
    text-transform: inherit;
    cursor: pointer;
    outline: none;

    &:disabled {
      cursor: default;
    }
  }
</style>
