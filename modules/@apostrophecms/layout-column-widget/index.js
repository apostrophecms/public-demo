import { fullConfig } from '../../../lib/area.js';

export default {
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          widgets: fullConfig
        }
      }
    }
  }
};
