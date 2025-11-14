import { fullConfig } from '../../../lib/area.js';
// console.log(fullConfig);
// delete fullConfig['@apostrophecms/layout'];
// for (const key in fullConfig) {
//   delete fullConfig[key].x;
// }

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
