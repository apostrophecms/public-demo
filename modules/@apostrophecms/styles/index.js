import color from './lib/color.js';
import font from './lib/font.js';
import nav from './lib/nav.js';
import button from './lib/button.js';
import card from './lib/card.js';
import priceCard from './lib/priceCard.js';
import footer from './lib/footer.js';
import spacing from './lib/spacing.js';
import table from './lib/table.js';

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
      ...table.fields,
      ...spacing.fields
    },
    group: {
      ...nav.group,
      ...font.group,
      ...color.group,
      ...button.group,
      ...card.group,
      ...priceCard.group,
      ...table.group,
      ...spacing.group,
      ...footer.group
    }
  }
};
