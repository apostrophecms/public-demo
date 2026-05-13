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
        label: 'Layout Gap',
        type: 'range',
        min: 0,
        max: 64,
        def: 24,
        unit: 'px',
        property: 'gap'
      }
    }
  }
};
