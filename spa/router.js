import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import moment from 'moment'
import Layout from './layout';
import MessagePage from './pages/message';
import PublicPage from './pages/public';
import RegisterUserPage from './pages/register';
import InputPage from './pages/input';
import Day from './models/day'

export default Router.extend({

  renderPage(page, opts = {layout: true}) {
    if(opts.layout) {
      page = (
        <Layout me={app.me}>
        {page}
        </Layout>
      );
    }
    React.render(page, document.body)
  },

  routes: {
    '': 'public',
    'register': 'registerUser',
    'input': 'input',
    'day/:date': 'day',
    'logout': 'logout',
    '*fourohfour': 'fourOhFour'
  },

  public () {
    if (!app.me.authenticated) {
      this.renderPage(<PublicPage me={app.me}/>, { layout: false });
    } else {
      this.redirectTo('/input')
    }
  },

  registerUser () {
    if (!app.me.authenticated) {
      this.renderPage(<RegisterUserPage user={app.me}/>, { layout: false });
    } else {
      var today = moment().format('MM-DD-YYYY');
      this.redirectTo('/day/' + today);
    }
  },

  input () {
    if (!app.me.authenticated) {
      this.redirectTo('');
    } else {
      app.me.days.fetch();
      this.renderPage(<InputPage days={app.me.days} />)
    }
  },

  logout () {
    app.me.clear();
    window.localStorage.clear();
    window.location = '/';
  },

  fourOhFour () {
    this.renderPage(<MessagePage title='Page not found' />);
  }

});
