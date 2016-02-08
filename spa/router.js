import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import moment from 'moment'
import Layout from './layout'
import MessagePage from './pages/message'
import PublicPage from './pages/public'
import RegisterUserPage from './pages/register'
import InputPage from './pages/input'
// import ChartPage from './pages/chart'
import D3ChartPage from './pages/d3-chart'

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
    '': 'input',
    'chart': 'd3Chart',
    'signin': 'public',
    'register': 'registerUser',
    'logout': 'logout',
    '*fourohfour': 'fourOhFour'
  },

  public () {
    if (!app.me.authenticated) {
      this.renderPage(<PublicPage me={app.me}/>, { layout: false });
    } else {
      this.redirectTo('/')
    }
  },

  registerUser () {
    if (!app.me.authenticated) {
      this.renderPage(<RegisterUserPage user={app.me}/>, { layout: false });
    } else {
      this.redirectTo('/')
    }
  },

  input () {
    if (!app.me.authenticated) {
      this.redirectTo('/signin');
    } else {
      app.me.days.fetch();
      this.renderPage(<InputPage days={app.me.days} />)
    }
  },

  // chart () {
  //   if (!app.me.authenticated) {
  //     this.redirectTo('/signin');
  //   } else {
  //     // app.me.days.fetch();
  //     this.renderPage(<ChartPage days={app.me.days} />)
  //   }
  // },

  d3Chart () {
    if (!app.me.authenticated) {
      this.redirectTo('/signin');
    } else {
      // app.me.days.fetch();
      this.renderPage(<D3ChartPage days={app.me.days} />)
    }
  },

  logout () {
    app.me.clear();
    window.localStorage.clear();
    window.location = '/signin';
  },

  fourOhFour () {
    this.renderPage(<MessagePage title='Page not found' />);
  }

});
