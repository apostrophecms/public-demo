<template>
  <span>{{ myComputedValue }}</span>
</template>
<script>
export default {
  name: 'SettingsDisplayNamePreview',
  props: {
    subform: {
      type: Object,
      required: true
    },
    values: {
      type: Object,
      required: true
    }
  },
  computed: {
    myComputedValue() {
      // this.subform is the config, this.values is the current field values
      return this.values.title || 'n/a';
    }
  }
};
</script>
