module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'recipe',
    label: 'Recipes',
  },
  fields: {
    add: {
      _recipes: {
        type: 'relationship',
        max: 3,
        min: 2,
        withType: 'recipe',
        label: 'Big Recipe',
        fields: {
          add: {
            description: {
              type: 'string',
              label: 'Description'
            }
          }
        }
      },
      test: {
        type: 'string',
        label: 'TEST'
      }
    }
  }
};
