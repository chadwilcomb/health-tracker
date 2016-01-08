import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Nav',

  render () {

    const {me} = this.props

    return (
      <nav className="navbar navbar-light bg-faded">
        <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#nav-collapse">
          &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="nav-collapse">
          <a className="navbar-brand" href="/"><i className="fa fa-heartbeat"></i> Health Trackr</a>
          <ul className="nav navbar-nav pull-right">
            <li className="nav-item">
              <span className="nav-link">Welcome, {me.username}</span>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

    )
  }
})
