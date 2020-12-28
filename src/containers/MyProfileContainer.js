import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import PlayerInfo from '../components/PlayerInfo'
import ChangePassword from '../components/ChangePassword'

export default class SessionContainer extends Component {
  state = {
    sessions: [],
    matches: [],
    activeItem: null,
  }

  componentDidMount() {}

  render() {
    const { user } = this.props

    return (
      <Card.Group>
        <PlayerInfo user={user} />
        <ChangePassword user={user} />
      </Card.Group>
    )
  }
}
