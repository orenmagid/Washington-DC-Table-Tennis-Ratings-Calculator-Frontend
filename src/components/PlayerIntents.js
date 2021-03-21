import React, { Component } from 'react'
import { Segment, Header, Card } from 'semantic-ui-react'
import { getDefaultDate, getRatingLimit } from '../utilities'
import PlayerIntent from './PlayerIntent'

export default class signupForm extends Component {
  componentDidMount() {}

  render() {
    const { signupForm } = this.props

    return (
      <Segment>
        <Header as="h4">Player Intents</Header>
        <Card.Group>
          {signupForm &&
            signupForm.recurring_sessions.map((recurringSession) => {
              const recurringSessionPlayers = signupForm.player_intents
                .filter((pi) => pi.recurring_session_id === recurringSession.id)
                .map((pi) => pi.player)

              return (
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {`${getDefaultDate(recurringSession, false)} — ${
                        recurringSession.name
                      } — ${getRatingLimit(recurringSession)}`}
                    </Card.Header>

                    <Card.Description>
                      {recurringSessionPlayers.map((player) => {
                        return (
                          <PlayerIntent
                            signupForm={signupForm}
                            player={player}
                          />
                        )
                      })}
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            })}
        </Card.Group>
      </Segment>
    )
  }
}
