import React from "react"
import { Grid, Message } from "semantic-ui-react"
import SignUpTable from "./SignUpTable"

class SignUpForm extends React.Component {
  render() {
    const { players } = this.props

    const numberPerColumn = players.length / 3

    return (
      <div style={{ padding: ".5rem 1.5rem", marginTop: ".5rem" }}>
        <Message style={{ padding: ".5rem 1rem" }}>
          <div className="content" style={{ fontSize: "9px" }}>
            Please put an "X" in the "Playing?" column next to your name if you
            are playing in the league today. If your name is not on this list,
            please add it to the bottom of the list, along with your estimated
            rating. If your name is on this list but incomplete or misspelled,
            please fix it.
          </div>
        </Message>

        <Grid columns={3}>
          <Grid.Column style={{ paddingRight: ".25rem" }}>
            <SignUpTable players={players.slice(0, numberPerColumn + 2)} />
          </Grid.Column>
          <Grid.Column
            style={{ paddingLeft: ".25rem", paddingRight: ".25rem" }}
          >
            <SignUpTable
              players={players.slice(
                numberPerColumn + 2,
                numberPerColumn * 2 + 2
              )}
            />
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: ".25rem" }}>
            <SignUpTable
              players={players.slice(numberPerColumn * 2 + 2)}
              final
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignUpForm
