export default () => {
  // apos.util.onReadyAndRefresh(() => {
    console.log('sup data');
    const toggle = document.querySelector('[data-mode-switch] input');
    console.log(toggle);
    toggle.addEventListener('change', function (evt) {
      console.log(evt);
      // console.log(this.value);
    });
    toggle.addEventListener('input', function (evt) {
      console.log(evt);
      // console.log(this.value);
    });
    toggle.addEventListener('click', function (evt) {
      console.log('click clack');
      // console.log(this.value);
    });
  // });
};
