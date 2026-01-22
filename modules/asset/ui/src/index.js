import localToggle from './_locales.js';
import modeToggle from './_dark-light-switch.js';
import mobileMenu from './_mobile.js';
import savePrefs from './_set-save-prefs.js';
import tracking from './_tracking.js';
import demoButtons from './_demo-buttons.js';

export default () => {
  localToggle();
  modeToggle();
  mobileMenu();
  savePrefs();
  tracking();
  demoButtons();

  console.log('look at me, I am project level js');
};
