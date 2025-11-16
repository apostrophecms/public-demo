// export default () => {
//   apos.util.onReady(() => {
//     const toggle = document.querySelector('[data-mode-switch] input');
//     toggle.addEventListener('change', function (evt) {
//       console.log('change');
//       console.log(evt);
//     });
//   });
// };

export default () => {
  apos.util.onReadyAndRefresh(() => {
    const toggle = document.querySelector('[data-mode-switch] input');

    if (!toggle) {
      return;
    }

    toggle.addEventListener('change', toggleMode);

    // window.addEventListener('click', clickOutside);

    function toggleMode (event) {
      console.log('change');
    }
  });
};
