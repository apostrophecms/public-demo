export default () => {
  const el = document.querySelector('[data-hello]');
  if (el) {
    el.style.border = '10px solid red';
    el.style.background = '#eee';
  }
};
