module.exports = {
  options: {
    // So baseUrl can be autodetected when behind nginx
    trustProxy: true,
    session: {
      // If this still says `undefined`, set a real secret!
      secret: 'e45faf16a3e6f86a'
    }
  }
};
