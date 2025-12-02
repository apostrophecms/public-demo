export default {
  options: {
    name: 'tour'
  },
  init(self, options) {
    self.prependNodes('body', 'ui');
  },
  methods(self) {
    return {
      ui(req) {
        return [
          {
            name: 'div',
            attrs: {
              id: 'apos-tour'
            }
          }
        ];
      }
    };
  }
};

