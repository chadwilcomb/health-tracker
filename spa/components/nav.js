import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Nav',

  render () {

    const {me} = this.props

    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" href="/"><i className="fa fa-heartbeat"></i> Health Trackr</a>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/chart" title="Chart"><i className="fa fa-bar-chart"></i></a>
          </li>
        </ul>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item">
            <span className="nav-link hidden-xs-down">Welcome, {me.username}</span>
            <span className="nav-link hidden-sm-up">{me.username}</span>
          </li>
          <li className="nav-item">
            <a className="nav-link hidden-xs-down" href="/logout" title="Logout">Logout</a>
            <a className="nav-link hidden-sm-up" href="/logout" title="Logout"><i className="fa fa-sign-out"></i></a>
          </li>
        </ul>
      </nav>

    )
  }
})
