export default {
  options: {
    label: 'project:layout',
    description: 'project:layoutDescription',
    previewImage: 'svg',
    className: 'widget'
  },
  styles: {
    add: {
      gap: {
        label: 'apostrophe:styleLayoutGap',
        type: 'range',
        min: 0,
        max: 64,
        unit: 'px',
        property: 'gap'
      }
    }
  }
};
