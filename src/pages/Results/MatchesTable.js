import React from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { useQuery } from "react-query"
import { Table, Loader, Message, Header, Segment } from "semantic-ui-react"
import CloseButton from "../../components/elements/CloseButton"
import ErrorMessage from "../../components/ErrorMessage"
import { fetchSession, fetchPlayers } from "../../api"
import { getFormattedDate } from "../../utilities"

export default function MatchesTable() {
  let { sessionId } = useParams()
  let history = useHistory()

  const {
    data: sessions,
    error: sessionsError,
    isLoading: isLoadingSessions,
    isError: isSessionErrors,
  } = useQuery(["session", sessionId], () => fetchSession(sessionId))

  const {
    data: players,
    error: playersError,
    isLoading: isLoadingPlayers,
    isError: isPlayersError,
  } = useQuery("players", fetchPlayers)

  const isLoading = isLoadingSessions || isLoadingPlayers
  const isError = isSessionErrors || isPlayersError
  const error = sessionsError || playersError

  if (isLoading) {
    return <Loader style={{ marginTop: "1rem" }} active inline="centered" />
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  console.log("sessions", sessions)

  return (
    <>
      <CloseButton handleClick={() => history.push("/results")} />
      <Message>
        <Header as="h3">{`Results for ${getFormattedDate(
          sessions[0].date,
          true
        )}`}</Header>
      </Message>
      {sessions.map((session, i) => (
        <Segment key={session.id}>
          {sessions.length > 1 ? (
            <Header as="h4">{`Group ${i + 1}`}</Header>
          ) : null}
          {session.winner_id || session.loser_id ? (
            <Table celled>
              <Table.Cell>
                {session.winner_id ? (
                  <Header as="h5">
                    Group Winner:{" "}
                    {players.find((p) => p.id === session.winner_id).name} (
                    <span style={{ color: "#008F47" }}>+40</span>)
                  </Header>
                ) : (
                  "No one wins 40 bonus points in the top group"
                )}
              </Table.Cell>
              <Table.Cell>
                {session.loser_id ? (
                  <Header as="h4">
                    Group Loser:{" "}
                    {players.find((p) => p.id === session.loser_id).name} (
                    <span style={{ color: "#F71735" }}>-40</span>)
                  </Header>
                ) : (
                  "No one loses 40 points in the bottom group"
                )}
              </Table.Cell>
            </Table>
          ) : null}

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Match Winner</Table.HeaderCell>
                <Table.HeaderCell>Match Loser</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {session.matches.map((match) => {
                const winner = match.players.find(
                  (player) => player.id === match.winner_id
                )
                const loser = match.players.find(
                  (player) => player.id !== match.winner_id
                )
                let winner_change
                let winner_color
                let loser_change
                let loser_color

                if (match.rating_change > 0) {
                  winner_change = `+${match.rating_change}`
                  winner_color = "#008F47"
                  loser_change = `-${match.rating_change}`
                  loser_color = "#F71735"
                } else if (match.rating_change === null) {
                  winner_change = ``
                  winner_color = "inherit"
                  loser_change = ``
                  loser_color = "inherit"
                } else {
                  winner_change = `0`
                  winner_color = "inherit"
                  loser_change = `0`
                  loser_color = "inherit"
                }
                return (
                  <Table.Row key={match.id}>
                    <Table.Cell>
                      <Link to={`/players/${winner.id}`}>{winner.name}</Link>{" "}
                      {match.rating_change !== null ? "(" : ""}
                      <span style={{ color: winner_color }}>
                        {winner_change}
                      </span>
                      {match.rating_change !== null ? ")" : ""}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/players/${loser.id}`}>{loser.name}</Link>{" "}
                      {match.rating_change !== null ? "(" : ""}
                      <span style={{ color: loser_color }}>{loser_change}</span>
                      {match.rating_change !== null ? ")" : ""}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Segment>
      ))}
    </>
  )
}
