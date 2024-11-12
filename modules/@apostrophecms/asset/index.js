export default {
  options: {
    breakpointPreviewMode: {
      enable: true,
      debug: true,
      resizable: false,
      screens: {
        responsive: {
          label: 'Responsive',
          width: '95vw',
          height: '800px',
          icon: 'monitor-icon',
          shortcut: true
        },
        nestHub: {
          label: 'Nest Hub',
          width: '1024px',
          height: '600px',
          icon: 'monitor-icon',
          shortcut: false
        },
        nestHubMax: {
          label: 'Nest Hub Max',
          width: '1280px',
          height: '800px',
          icon: 'monitor-icon',
          shortcut: false
        },
        ipadMini: {
          label: 'iPad Mini',
          width: '768px',
          height: '1024px',
          icon: 'tablet-icon',
          shortcut: true
        },
        ipadAir: {
          label: 'iPad Air',
          width: '820px',
          height: '1180px',
          icon: 'tablet-icon',
          shortcut: false
        },
        ipadPro: {
          label: 'iPad Pro',
          width: '1024px',
          height: '1366px',
          icon: 'tablet-icon',
          shortcut: false
        },
        surfacePro7: {
          label: 'Surface Pro 7',
          width: '912px',
          height: '1368px',
          icon: 'tablet-icon',
          shortcut: false
        },
        iphoneSE: {
          label: 'iPhone SE',
          width: '375px',
          height: '667px',
          icon: 'cellphone-icon',
          shortcut: true
        },
        iphoneXR: {
          label: 'iPhone XR',
          width: '414px',
          height: '896px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        iphone12Pro: {
          label: 'iPhone 12 Pro',
          width: '390px',
          height: '844px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        iphone14ProMax: {
          label: 'iPhone 14 Pro Max',
          width: '430px',
          height: '932px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        pixel7: {
          label: 'Pixel 7',
          width: '412px',
          height: '915px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        samsungGalaxyS8Plus: {
          label: 'Samsung Galaxy S8+',
          width: '360px',
          height: '740px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        samsungGalaxyS20Ultra: {
          label: 'Samsung Galaxy S20 Ultra',
          width: '412px',
          height: '915px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        surfaceDuo: {
          label: 'Surface Duo',
          width: '540px',
          height: '720px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        galaxyZFold5Front: {
          label: 'Galaxy Z Fold 5 (Front)',
          width: '373px',
          height: '818px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        galaxyZFold5Inner: {
          label: 'Galaxy Z Fold 5 (Inner)',
          width: '768px',
          height: '1812px',
          icon: 'tablet-icon',
          shortcut: false
        },
        samsungGalaxyA51A71: {
          label: 'Samsung Galaxy A51/71',
          width: '412px',
          height: '915px',
          icon: 'cellphone-icon',
          shortcut: false
        }
      }
    },
    // Transform method used on media feature
    // Can be either:
    // - (mediaFeature) => { return mediaFeature; }
    // - null
    transform: null
  }
};
