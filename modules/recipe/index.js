module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    name: 'recipe',
    label: 'Recipe',
    alias: 'recipe',
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