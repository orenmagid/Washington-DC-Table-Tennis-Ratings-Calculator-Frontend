import React, { useState, useEffect } from "react"
import Select from "react-select"
import { Button, Message, Segment, Icon, Form } from "semantic-ui-react"
import ScoreCardTable from "./ScoreCardTable"
import ResultsTable from "./ResultsTable"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"

export default function ScoreCard({
  players,
  handleCreateSessionClick,
  handleDateChange,
  date,
}) {
  const [matches, setMatches] = useState([])
  const [winnerOfSessionId, setWinnerOfSessionId] = useState(null)
  const [loserOfSessionId, setLoserOfSessionId] = useState(null)

  useEffect(() => {
    setInitialMatches(players)
  }, [players])

  const handleClick = (index, i) => {
    const stateMatches = [...matches]
    let oneMatchIndex
    let anotherMatchIndex
    if (index < i) {
      oneMatchIndex = players.length * index + i - index - 1
      anotherMatchIndex = players.length * i + index - i
    } else {
      oneMatchIndex = players.length * i + index - i - 1
      anotherMatchIndex = players.length * index + i - index
    }

    const anotherMatchProgression = {
      "pointing up": { icon: "pointing left", size: "huge", played: true },
      "pointing left": { icon: "close", size: "huge", played: false },
      close: { icon: "pointing up", size: "large", played: true },
    }

    const oneMatchProgression = {
      "pointing left": { icon: "pointing up", size: "huge", played: true },
      "pointing up": { icon: "close", size: "huge", played: false },
      close: { icon: "pointing left", size: "large", played: true },
    }

    const oneMatch = stateMatches[oneMatchIndex]

    oneMatch.size = oneMatchProgression[oneMatch.icon].size
    oneMatch.played = oneMatchProgression[oneMatch.icon].played
    oneMatch.icon = oneMatchProgression[oneMatch.icon].icon
    if (oneMatch.icon !== "close") {
      ;[oneMatch.winner, oneMatch.loser] = [oneMatch.loser, oneMatch.winner]
    }

    stateMatches[oneMatchIndex] = oneMatch

    const anotherMatch = stateMatches[anotherMatchIndex]

    anotherMatch.size = anotherMatchProgression[anotherMatch.icon].size
    anotherMatch.played = anotherMatchProgression[anotherMatch.icon].played
    anotherMatch.icon = anotherMatchProgression[anotherMatch.icon].icon
    if (anotherMatch.icon !== "close") {
      ;[anotherMatch.winner, anotherMatch.loser] = [
        anotherMatch.loser,
        anotherMatch.winner,
      ]
    }
    stateMatches[anotherMatchIndex] = anotherMatch

    setMatches(stateMatches)
  }

  const setInitialMatches = (players) => {
    const matches = []

    players.forEach((player, index) => {
      players.forEach((p, i) => {
        if (index !== i) {
          const winner = index < i ? player : p
          const loser = index > i ? player : p
          const icon = index > i ? "pointing up" : "pointing left"
          const size = "large"
          const count = index < i ? true : false
          const played = true
          const hide = false
          matches.push({
            winner,
            loser,
            icon,
            size,
            count,
            played,
            hide,
          })
        }
      })
    })

    setMatches(matches)
  }

  const playerOptions = players
    .filter((player) => !player.hide)
    .map((player) => ({
      label: `${player.name} (${player.most_recent_rating})`,
      value: player,
    }))

  const handleWinnerOfSessionChange = (selectedOption) => {
    setWinnerOfSessionId(selectedOption ? selectedOption.value.id : null)
  }

  const handleLoserOfSessionChange = (selectedOption) => {
    setLoserOfSessionId(selectedOption ? selectedOption.value.id : null)
  }

  return (
    <Segment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form>
          <Form.Field>
            <DatePicker
              placeholderText="Date of Session"
              selected={date}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </Form.Field>
        </Form>

        <Button
          icon
          labelPosition="right"
          onClick={() =>
            handleCreateSessionClick(
              matches,
              winnerOfSessionId,
              loserOfSessionId
            )
          }
        >
          Submit Session and Calculate Ratings
          <Icon name="calculator" />
        </Button>
      </div>
      {players.length > 0 ? (
        <>
          <div style={{ marginTop: ".75rem" }}>
            <Select
              isClearable
              placeholder="Winner of Session"
              defaultValue={null}
              onChange={handleWinnerOfSessionChange}
              options={playerOptions}
            />
          </div>
          <div style={{ marginTop: ".75rem" }}>
            <Select
              isClearable
              placeholder="Loser of Session"
              defaultValue={null}
              onChange={handleLoserOfSessionChange}
              options={playerOptions}
            />
          </div>
        </>
      ) : null}

      <Message
        style={{ marginTop: "2rem" }}
        content="The scorecard will default with the expected winners prefilled. You'll then be able to delete players that didn't show, change the winner where the underdog prevailed, and save the session and calculate ratings."
      />

      <ScoreCardTable
        players={players}
        handleClick={handleClick}
        matches={matches}
      />
      <ResultsTable matches={matches} />
    </Segment>
  )
}
