export default {
  options: {
    label: 'project:image',
    description: 'project:imageDescription',
    previewImage: 'svg',
    inlineStyles: false,
    className: 'widget demo-image',
    dimensionAttrs: true,
    size: 'full',
    loadingType: 'lazy'
  },
  styles: {
    add: {
      width: {
        preset: 'width',
        selector: '.demo-image'
      },
      align: {
        label: 'project:align',
        type: 'radio',
        buttons: true,
        property: 'justify-content',
        selector: '.demo-image__wrapper',
        def: 'begin',
        choices: [
          {
            label: 'project:left',
            value: 'begin',
            icon: 'format-align-left-icon'
          },
          {
            label: 'project:center',
            value: 'center',
            icon: 'format-align-center-icon'
          },
          {
            label: 'project:right',
            value: 'end',
            icon: 'format-align-right-icon'
          }
        ]
      },
      flip: {
        label: 'project:flip',
        type: 'radio',
        buttons: true,
        property: 'transform',
        selector: '.demo-image__wrapper',
        def: 'scaleX(1) scaleY(1)',
        choices: [
          {
            label: 'project:original',
            value: 'scaleX(1) scaleY(1)'
          },
          {
            label: 'project:flipHorizontal',
            value: 'scaleX(-1) scaleY(1)'
          },
          {
            label: 'project:flipVertical',
            value: 'scaleX(1) scaleY(-1)'
          },
          {
            label: 'project:flipBoth',
            value: 'scaleX(-1) scaleY(-1)'
          }
        ]
      },
      rotate: {
        label: 'project:rotate',
        type: 'range',
        def: 0,
        unit: 'deg',
        property: 'transform',
        min: 0,
        max: 360,
        step: 45,
        selector: '.demo-image',
        valueTemplate: 'rotate(%VALUE%)'
      },
      radius: {
        label: 'project:borderRadius',
        type: 'range',
        def: 10,
        unit: 'px',
        min: 0,
        max: 100,
        property: 'border-radius',
        selector: '.demo-image'
      },
      filter: {
        label: 'project:photoFilter',
        type: 'select',
        property: 'filter',
        selector: '.demo-image',
        def: 'none',
        choices: [
          {
            label: 'project:original',
            value: 'none'
          },
          {
            label: 'project:photoFilterVintage',
            value: 'brightness(90%) contrast(120%) saturate(85%) sepia(60%)'
          },
          {
            label: 'project:photoFilterNoir',
            value: 'brightness(90%) contrast(120%) grayscale(100%)'
          },
          {
            label: 'project:photoFilterWarmSunset',
            value: 'saturate(140%) sepia(30%)'
          },
          {
            label: 'project:photoFilterCoolTones',
            value: 'brightness(105%) hue-rotate(180deg) saturate(110%)'
          },
          {
            label: 'project:photoFilterDramatic',
            value: 'brightness(80%) contrast(150%) saturate(120%)'
          },
          {
            label: 'project:photoFilterNostalgia',
            value: 'contrast(120%) hue-rotate(20deg) saturate(200%)'
          },
          {
            label: 'project:photoFilterFade',
            value: 'brightness(110%) contrast(90%) opacity(80%)'
          }
        ]
      }
    }
  }
};
