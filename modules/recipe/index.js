module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Recipe',
    sort: { title: 1 }
  },
  fields: {
    add: {
      nice: {
        type: 'string',
        label: 'Nice'
      },
    }
  }
}