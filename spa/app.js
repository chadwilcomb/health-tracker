import app from 'ampersand-app'
import Router from './router'
import Me from './models/me'
import config from './config'

import bootstrap from 'bootstrap-loader'
import styles from './styles/main.scss'

require('file?name=favicon.ico!./favicon.ico');

//expose 'app' to browser console for debugging
window.app = app;

app.extend({
  init () {
    // const _this = this;
    this.me = new Me();
    this.startRouter();
  },
  startRouter () {
    this.router = new Router();
    this.router.history.start();
  }
});

app.apiUrl = config.apiUrl; //'http://localhost:8080';

app.init();
