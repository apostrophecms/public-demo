<template>
  <div
    class="apos-table__cell-field apos-table__cell-field--image"
    :class="`apos-table__cell-field--${header.name}`"
    :style="[{'background-image': `url(${imageUrl})` }]"
  />
</template>

<script>
export default {
  name: 'DemoCellImage',
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
    imageUrl() {
      return this.item._image[0]?.attachment._urls['one-third'];
    }
  }
};
</script>

<style lang="scss" scoped>
.apos-table__cell-field--image {
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
