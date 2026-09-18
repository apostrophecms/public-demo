// An `inlineSelect` field: one choice out of several, edited with a `select`
// element right where it appears on the page.
//
// Core's own `select` type is not touched, because redefining a core field
// type would replace it everywhere. This is an ordinary custom field type
// that happens to know how to be edited in place.

export default {
  icons: {
    'form-select-icon': 'FormSelect'
  },
  init(self) {
    self.addInlineSelectFieldType();
  },
  methods(self) {
    return {
      addInlineSelectFieldType() {
        self.apos.schema.addFieldType({
          name: 'inlineSelect',
          // In the document's modal it is an ordinary select field
          vueComponent: 'AposInputSelect',
          def: null,

          // 👇 Everything from here down is inline editing

          // This type can be edited in place
          wysiwyg: true,
          // Our own component, since a select is not a text box
          wysiwygComponent: 'AposWysiwygInputInlineSelect',
          // A choice is a word in a sentence, not a block of its own
          wysiwygTag() {
            return 'span';
          },
          // Registered in the `icons` section above
          wysiwygIcon: 'form-select-icon',
          // The page shows the label; the document stores the value. Only the
          // server knows which is which, so only the server can say this
          async wysiwygRender(req, field, value) {
            const choice = (field.choices || [])
              .find(choice => choice.value === value);
            return self.apos.util.escapeHtml(choice ? req.t(choice.label) : '');
          },

          // 👆 Everything above is inline editing

          convert(req, field, data, destination) {
            destination[field.name] = self.apos.launder.select(
              data[field.name],
              field.choices,
              field.def
            );
          },
          index(value, field, texts) {
            texts.push({
              weight: field.weight || 15,
              text: value,
              // A stored choice is rarely what someone searches for, so stay
              // out of the search index unless the field asks to be in it
              silent: field.silent ?? true
            });
          },
          isEmpty(field, value) {
            return !value;
          }
        });
      }
    };
  }
};
