// scaffold out a basic intro flow
const flow = {
  id: 'intro',
  el: '.home-page',
  run(introJs, setValue) {
    const partOne = introJs.tour();
    const partTwo = introJs.tour();
    const partThree = introJs.tour();

    partOne.setOptions({
      steps: [
        {
          intro: 'this is the intro, nice to have you',
          position: 'middle'
        },
        {
          element: '.apos-admin-bar__item',
          intro: 'These items let you manage your site content.',
          position: 'middle'
        },
        {
          element: '[data-apos-test="@apostrophecms/global:singleton-editorTrigger"]',
          intro: 'Edit the global settings for your site.',
          position: 'middle'
        }
      ]
    });

    partTwo.setOptions({
      steps: [
        {
          element: '[data-apos-test="context-menu-content"]',
          intro: 'Manage your media library here.',
          position: 'middle'
        }
      ]
    });

    partThree.setOptions({
      steps: [
        {
          element: '.apos-context-menu__pane',
          intro: 'Change locales here',
          position: 'middle'
        }
      ]
    });

    partOne.oncomplete(function(step, reason) {
      setTimeout(() => {
        document.querySelector('[data-apos-test="media-dropdown"] button').click();
        setTimeout(() => {
          partTwo.start();
        }, 50);
      }, 50);
    });

    partTwo.oncomplete(function(step, reason) {
      setTimeout(() => {
        document.body.click();
        document.querySelector('[data-apos-test="localePickerTrigger"] button').click();
        setTimeout(() => {
          partThree.start();
        }, 50);
      }, 50);
    });

    partThree.oncomplete(function(step, reason) {
      setValue(flow.id, true);
    });

    partOne.start();
  }
};

export default flow;
