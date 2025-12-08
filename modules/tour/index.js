export default {
  options: {
    name: 'tour'
  },
  icons: {
    'bullhorn-icon': 'Bullhorn'
  },
  init(self, options) {
    self.prependNodes('body', 'ui');
    self.apos.adminBar.add(
      'tour-settings',
      'Tour Settings',
      true,
      {
        contextUtility: true,
        icon: 'bullhorn-icon',
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
