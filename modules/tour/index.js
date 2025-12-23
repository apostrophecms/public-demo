export default {
  options: {
    name: 'tour'
  },
  init(self, options) {
    self.prependNodes('body', 'ui');
    self.apos.adminBar.add(
      'tour-settings',
      'Tour Settings',
      true,
      {
        contextUtility: true,
        displayLabel: true,
        icon: 'help-circle-icon',
        tooltip: 'Tour Settings',
        modal: 'AposModalShareDraft'
      }
    );
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
