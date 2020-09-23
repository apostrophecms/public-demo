module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    name: 'recipe',
    label: 'Recipes',
    alias: 'recipePage',
    perPage: 10
  },
  fields: {
    add: {
      coolRecipes: {
        label: 'Recipes!',
        type: 'area',
        options: {
          widgets: {
            'recipe': {}
          }
        }
      }
    }
  }
}