var getConfig = require('hjs-webpack');

module.exports = getConfig({
  in: 'spa/app.js',
  out: 'public',
  isDev: process.env.NODE_ENV !== 'production',
  hostname: 'piq-chad.local',
  html: function (context) {
    return {
      '200.html': context.defaultTemplate(),
      'index.html': context.defaultTemplate()
    };
  }
});
