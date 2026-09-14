export default {
  options: {
    // So baseUrl can be autodetected when behind nginx
    trustProxy: true,
    session: {
      // Signs session cookies. Set a long random APOS_SESSION_SECRET in .env
      // for every real deployment; Apostrophe logs a warning when it is unset.
      secret: process.env.APOS_SESSION_SECRET
    }
  }
};
