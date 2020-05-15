// This configures the @apostrophecms/assets module to push a 'site.less'
// stylesheet by default, and to use jQuery 3.x

module.exports = {
  options: {
    jQuery: 3,
    stylesheets: [
      {
        name: 'site'
      }
    ],
    scripts: [
      {
        name: 'site'
      }
    ]
  }
};
