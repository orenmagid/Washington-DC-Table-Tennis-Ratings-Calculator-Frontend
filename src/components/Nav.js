import React, { Component } from 'react'
import { Link } from '@reach/router'
import { Menu } from 'semantic-ui-react'
import { isAdmin, isLoggedIn } from '../utilities'

export default class Nav extends Component {
  render() {
    const { activeItem, handleNavClick } = this.props

    return (
      <Menu tabular stackable>
        <Link to="/" onClick={() => handleNavClick('players')}>
          <Menu.Item name="players" active={activeItem === 'players'} />
        </Link>
        <Link to="/sessions" onClick={() => handleNavClick('sessions')}>
          <Menu.Item name="sessions" active={activeItem === 'sessions'} />
        </Link>
        {isAdmin() ? (
          <Link
            to="/record-results"
            onClick={() => handleNavClick('record-results')}
          >
            <Menu.Item
              name="record results"
              icon="calculator"
              active={activeItem === 'record-results'}
            />
          </Link>
        ) : null}
        {isLoggedIn() ? (
          <Link to="/my-profile" onClick={() => handleNavClick('my-profile')}>
            <Menu.Item
              name="My Profile"
              icon="user outline"
              active={activeItem === 'my-profile'}
            />
          </Link>
        ) : null}
      </Menu>
    )
  }
}
