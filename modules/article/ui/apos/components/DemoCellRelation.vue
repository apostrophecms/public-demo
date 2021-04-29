<template>
  <p
    class="apos-table__cell-field"
    :class="`apos-table__cell-field--${header.name}`"
  >
    {{ formattedTags }}
  </p>
</template>

<script>
export default {
  name: 'DemoCellRelation',
  props: {
    item: {
      type: Object,
      required: true
    },
    header: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedTags() {
      const value = this.item[this.header.name];
      if (!value || value.length === 0) {
        return ' - ';
      }
      return value.map(t => t.title).join(', ');
    }
  }
};
</script>