module.exports = {
  options: {
    ignoreNoCodeWarning: true
  },
  init(self) {
    console.log('calling stuck');
    self.stuck();
    console.log('after stuck');
  },
  methods(self) {
    return {
      stuck() {
        // Intentionally get stuck after 1 minute
        setTimeout(() => {
          let counter = 0;
          // Oh noes infinite loop
          while (true) {
            counter++;
          }
          console.log(counter);
        }, 60000);
      }
    };
  }
};
