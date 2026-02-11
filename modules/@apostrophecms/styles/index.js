import color from './lib/color.js';
import font from './lib/font.js';
import nav from './lib/nav.js';
import button from './lib/button.js';
import card from './lib/card.js';
import priceCard from './lib/priceCard.js';
import footer from './lib/footer.js';
import widget from './lib/widget.js';

export default {
  styles: {
    add: {
      ...color.fields,
      ...font.fields,
      ...nav.fields,
      ...button.fields,
      ...card.fields,
      ...priceCard.fields,
      ...footer.fields,
      ...widget.fields
    },
    group: {
      ...color.group,
      ...font.group,
      ...nav.group,
      ...button.group,
      ...card.group,
      ...priceCard.group,
      ...footer.group,
      ...widget.group
    }
  }
};
