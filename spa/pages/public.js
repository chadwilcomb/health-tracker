import React from 'react';
import app from 'ampersand-app';
import moment from 'moment';

export default React.createClass({
    displayName: 'PublicPage',

    getInitialState () {
      return {
        username: '',
        password: '',
        error: ''
      };
    },

    onSubmitForm (event) {
      var _this = this;
      event.preventDefault();

      _this.setState({ error: false });
      const {me} = this.props;

      me.set(this.state);

      me.fetch({
        error: function (model, response, options) {
          _this.setState({ error: 'Your username and/or password are incorrect' });
        },
        success: function () {
          app.router.redirectTo('/input');
        }
      });
    },

    onUsernameChange (event) {
      this.setState({
        username: event.target.value
      });
    },

    onPasswordChange (event) {
      this.setState({
        password: event.target.value
      });
    },

    render () {
        const {username,password,error} = this.state;

        return (
          <div className='container'>
            <h1>Health Trackr</h1>
            <form name='signinForm' onSubmit={this.onSubmitForm} >
              <fieldset>
                <legend>Sign In</legend>

                <div className={error ? 'message message-error' : 'hidden'}>{error}</div>

                <div className='form-group'>
                  <label htmlFor='inputUsername'>Username</label>
                  <input id='inputUsername' onChange={this.onUsernameChange} name='inputUsername' placeholder='Enter username' className='form-control' type='text' value={username} required/>
                </div>

                <div className='form-group'>
                  <label htmlFor='inputPassword'>Password</label>
                  <input id='inputPassword' onChange={this.onPasswordChange} name='inputPassword' placeholder='Enter password' className='form-control' type='password'  value={password} required/>
                </div>

                <button type='submit' className='btn btn-default'>Sign in</button>
                <div><a href='/register'>Register user</a></div>

              </fieldset>
            </form>
          </div>
        )
    }
});
