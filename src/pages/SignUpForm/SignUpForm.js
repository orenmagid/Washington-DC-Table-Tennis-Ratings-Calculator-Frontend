import React from "react"
import { Grid, Message } from "semantic-ui-react"
import SignUpTable from "./SignUpTable"

class SignUpForm extends React.Component {
  render() {
    const { players } = this.props

    const numberPerColumn = players.length / 3

    return (
      <div style={{ padding: ".25rem" }}>
        <Message>
          <div className="content" style={{ fontSize: "9px" }}>
            Please put an "X" in the "Playing?" column next to your name if you
            are playing in the league today. If your name is not on this list,
            please add it to the bottom of the list, along with your estimated
            rating. If your name is on this list but incomplete or misspelled,
            please fix it.
          </div>
        </Message>

        <Grid columns={3}>
          <Grid.Column>
            <SignUpTable players={players.slice(0, numberPerColumn + 1)} />
          </Grid.Column>
          <Grid.Column>
            <SignUpTable
              players={players.slice(
                numberPerColumn + 1,
                numberPerColumn * 2 + 1
              )}
            />
          </Grid.Column>
          <Grid.Column>
            <SignUpTable
              players={players.slice(numberPerColumn * 2 + 1)}
              final
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignUpForm