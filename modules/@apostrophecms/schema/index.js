
export default {
  init(self) {
    self.addFieldType({
      name: 'theme',
      extend: 'select',
      vueComponent: 'ThemeField',
      def: {}
    });
  }
};
