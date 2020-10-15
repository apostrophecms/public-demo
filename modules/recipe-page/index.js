module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Recipes',
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