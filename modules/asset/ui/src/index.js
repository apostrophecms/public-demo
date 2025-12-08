import localToggle from './_locales.js';
import modeToggle from './_dark-light-switch.js';
import mobileMenu from './_mobile.js';
import savePrefs from './_set-save-prefs.js';

export default () => {
  localToggle();
  modeToggle();
  mobileMenu();
  savePrefs();

  console.log('look at me, I am project level js');
};
