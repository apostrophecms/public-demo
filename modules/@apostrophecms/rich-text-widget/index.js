export default {
  options: {
    label: 'project:richText',
    description: 'project:richTextDescription',
    previewImage: 'svg',
    className: 'widget demo-rte',
    imageStyles: [
      {
        value: 'image-full',
        label: 'project:fullWidth'
      },
      {
        value: 'image-center',
        label: 'project:center'
      },
      {
        value: 'image-float-left',
        label: 'project:left'
      },
      {
        value: 'image-float-right',
        label: 'project:right'
      }
    ]
  },
  styles: {
    add: {
      width: 'width',
      alignment: {
        type: 'radio',
        buttons: true,
        class: true,
        choices: [
          {
            label: 'apostrophe:styleLeft',
            value: 'apos-left'
          },
          {
            label: 'apostrophe:styleCenter',
            value: 'apos-center'
          },
          {
            label: 'apostrophe:styleRight',
            value: 'apos-right'
          }
        ]
      }
    }
  }
};
