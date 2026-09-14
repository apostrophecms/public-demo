import localToggle from './_locales.js';
import modeToggle from './_dark-light-switch.js';
import mobileMenu from './_mobile.js';

export default () => {
  localToggle();
  modeToggle();
  mobileMenu();
};
