// This configures the @apostrophecms/user module to add an admin-level
// group by default:

module.exports = {
  options: {
    groups: [
      {
        title: 'guest',
        permissions: [ ]
      },
      {
        title: 'admin',
        permissions: [ 'admin' ]
      }
    ]
  }
};
