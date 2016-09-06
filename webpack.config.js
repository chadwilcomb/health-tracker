var getConfig = require('hjs-webpack');

var favicon = '<link rel="shortcut icon" href="images/favicon/favicon.ico" type="image/x-icon" />' +
  '<link rel="apple-touch-icon" href="images/favicon/apple-touch-icon.png" />' +
  '<link rel="apple-touch-icon" sizes="57x57" href="images/favicon/apple-touch-icon-57x57.png" />' +
  '<link rel="apple-touch-icon" sizes="72x72" href="images/favicon/apple-touch-icon-72x72.png" />' +
  '<link rel="apple-touch-icon" sizes="76x76" href="images/favicon/apple-touch-icon-76x76.png" />' +
  '<link rel="apple-touch-icon" sizes="114x114" href="images/favicon/apple-touch-icon-114x114.png" />' +
  '<link rel="apple-touch-icon" sizes="120x120" href="images/favicon/apple-touch-icon-120x120.png" />' +
  '<link rel="apple-touch-icon" sizes="144x144" href="images/favicon/apple-touch-icon-144x144.png" />' +
  '<link rel="apple-touch-icon" sizes="152x152" href="images/favicon/apple-touch-icon-152x152.png" />' +
  '<link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon-180x180.png" />';


var config = getConfig({
  in: 'spa/app.js',
  out: 'public',
  isDev: process.env.NODE_ENV !== 'production',
  hostname: 'piq-chad.local',
  html: function (context) {
    return {
      '200.html': context.defaultTemplate(),
      'index.html': context.defaultTemplate({ title: 'Health Trackr', head: favicon })
    };
  }
});

config.devtool = '#eval-cheap-module-source-map';

module.exports = config;
