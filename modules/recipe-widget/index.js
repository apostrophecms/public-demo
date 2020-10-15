module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Recipes',
  },
  fields: {
    add: {
      _recipes: {
        type: 'relationship',
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
