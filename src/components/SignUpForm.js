import React from "react"
import { Table, Message } from "semantic-ui-react"

class SignUpForm extends React.Component {
  render() {
    const { players } = this.props

    return (
      <>
        {/* <Message>
          <div className="content">
            <ul>
              <li>
                Please put an "X" in the "Playing?" column next to your name if
                you are playing in the league today.
              </li>

              <li>
                If your name is not on this list, please add it to the bottom of
                the list, along with your estimated rating.
              </li>

              <li>
                If your name is on this list but incomplete or misspelled,
                please fix it.
              </li>
            </ul>
          </div>
        </Message> */}

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <ul>
                  <li>
                    Please put an "X" in the "Playing?" column next to your name
                    if you are playing in the league today.
                  </li>

                  <li>
                    If your name is not on this list, please add it to the
                    bottom of the list, along with your estimated rating.
                  </li>

                  <li>
                    If your name is on this list but incomplete or misspelled,
                    please fix it.
                  </li>
                </ul>
              </Table.HeaderCell>
            </Table.Row>

            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Playing?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {players.map((player) => {
              if (!player.hide) {
                return (
                  <Table.Row key={player.name}>
                    <Table.Cell>{player.name}</Table.Cell>
                    <Table.Cell>{player.most_recent_rating}</Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                )
              } else {
                return null
              }
            })}
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    )
  }
}

export default SignUpForm
