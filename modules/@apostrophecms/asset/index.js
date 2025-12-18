export default {
  options: {
    breakpointPreviewMode: {
      enable: true,
      debug: true,
      resizable: false,
      screens: {
        responsive: {
          label: 'project:breakpointResponsive',
          width: '95vw',
          height: '800px',
          icon: 'monitor-icon',
          shortcut: true
        },
        nestHub: {
          label: 'project:breakpointNestHub',
          width: '1024px',
          height: '600px',
          icon: 'monitor-icon',
          shortcut: false
        },
        nestHubMax: {
          label: 'project:breakpointNestHubMax',
          width: '1280px',
          height: '800px',
          icon: 'monitor-icon',
          shortcut: false
        },
        ipadMini: {
          label: 'project:breakpointIpadMini',
          width: '768px',
          height: '1024px',
          icon: 'tablet-icon',
          shortcut: true
        },
        ipadAir: {
          label: 'project:breakpointIpadAir',
          width: '820px',
          height: '1180px',
          icon: 'tablet-icon',
          shortcut: false
        },
        ipadPro: {
          label: 'project:breakpointIpadPro',
          width: '1024px',
          height: '1366px',
          icon: 'tablet-icon',
          shortcut: false
        },
        surfacePro7: {
          label: 'project:breakpointSurfacePro7',
          width: '912px',
          height: '1368px',
          icon: 'tablet-icon',
          shortcut: false
        },
        iphoneSE: {
          label: 'project:breakpointIphoneSE',
          width: '375px',
          height: '667px',
          icon: 'cellphone-icon',
          shortcut: true
        },
        iphoneXR: {
          label: 'project:breakpointIphoneXR',
          width: '414px',
          height: '896px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        iphone12Pro: {
          label: 'project:breakpointIphone12Pro',
          width: '390px',
          height: '844px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        iphone14ProMax: {
          label: 'project:breakpointIphone14ProMax',
          width: '430px',
          height: '932px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        pixel7: {
          label: 'project:breakpointPixel7',
          width: '412px',
          height: '915px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        samsungGalaxyS8Plus: {
          label: 'project:breakpointSamsungGalaxyS8Plus',
          width: '360px',
          height: '740px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        samsungGalaxyS20Ultra: {
          label: 'project:breakpointSamsungGalaxyS20Ultra',
          width: '412px',
          height: '915px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        surfaceDuo: {
          label: 'project:breakpointSurfaceDuo',
          width: '540px',
          height: '720px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        galaxyZFold5Front: {
          label: 'project:breakpointGalaxyZFold5Front',
          width: '373px',
          height: '818px',
          icon: 'cellphone-icon',
          shortcut: false
        },
        galaxyZFold5Inner: {
          label: 'project:breakpointGalaxyZFold5Inner',
          width: '768px',
          height: '1812px',
          icon: 'tablet-icon',
          shortcut: false
        },
        samsungGalaxyA51A71: {
          label: 'project:breakpointSamsungGalaxyA51A71',
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
