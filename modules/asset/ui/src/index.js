import localToggle from './_locales.js';
import modeToggle from './_dark-light-switch.js';
import mobileMenu from './_mobile.js';

export default () => {
  localToggle();
  modeToggle();
  mobileMenu();

  console.log('look at me, I am project level js');
};
