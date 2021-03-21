import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { mostRecentPlayerRating } from '../utilities'

export default class PlayerIntent extends Component {
  componentDidMount() {}

  render() {
    const { player, signupForm } = this.props

    const numberOfPlayerIntents = signupForm.player_intents.filter(
      (pi) => pi.player_id === player.id
    ).length
    return (
      <Segment>
        {`${player.name}: ${mostRecentPlayerRating(player, true).value}`}
        {numberOfPlayerIntents > 1 ? `(${numberOfPlayerIntents})` : ''}
      </Segment>
    )
  }
}
