export default () => {
  apos.util.onReadyAndRefresh(() => {
    const buttons = document.querySelectorAll('a[href="#demo"]');
    Array.from(buttons).forEach(button => {
      button.addEventListener('click', handleClick);
    });

    function handleClick(e) {
      e.preventDefault();
      apos.notify('This button is just a demo', {
        type: 'success',
        dismiss: true
      });
    }
  });
};
