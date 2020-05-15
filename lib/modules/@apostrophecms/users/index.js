// This configures the @apostrophecms/users module to add an admin-level
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
