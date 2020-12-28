import React, { Component } from 'react'
import { Card, Icon, Modal } from 'semantic-ui-react'
import PlayerStats from './PlayerStats'
import { mostRecentPlayerRating } from '../utilities'

export default class PlayerTable extends Component {
  state = {
    modalOpen: false,
  }

  render() {
    const { modalOpen } = this.state
    const { user } = this.props

    return (
      <Card>
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>
            {user.ratings
              ? 'Current Rating: ' + mostRecentPlayerRating(user).value
              : 'No rating yet'}
            {user.ratings && user.ratings.length > 1 ? (
              <Modal
                closeIcon
                open={modalOpen}
                trigger={
                  <Icon name="chart line" style={{ marginLeft: '.25rem' }} />
                }
                onClose={() => this.setState({ modalOpen: false })}
                onOpen={() =>
                  this.setState({
                    modalOpen: true,
                  })
                }
              >
                <Modal.Content>
                  <PlayerStats player={user} />
                </Modal.Content>
              </Modal>
            ) : null}
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}
