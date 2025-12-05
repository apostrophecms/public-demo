export default {
  options: {
    label: 'Rich Text',
    description: 'Add styled text to your page',
    previewImage: 'svg',
    className: 'widget demo-rte',
    defaultData: {
      content: '<h2>A new page!!!!</h2>'
    },
    imageStyles: [
      {
        value: 'image-full',
        label: 'Full Width'
      },
      {
        value: 'image-center',
        label: 'Center'
      },
      {
        value: 'image-float-left',
        label: 'Float Left'
      },
      {
        value: 'image-float-right',
        label: 'Float Right'
      }
    ]
  }
};
