import React, { useState } from "react"
import { Route, useHistory } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"
import { Container, Form, Segment, Message, Loader } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import Scorecard from "./ScoreCard"
import { createSession } from "../../api"
import { getFormattedDate } from "../../utilities"

export default function CreateSessionForm({ players }) {
  const [date, setDate] = useState(null)

  let history = useHistory()

  const queryClient = useQueryClient()

  const {
    mutate: createSessionMutate,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation((data) => createSession(data), {
    onSuccess: (session) => {
      queryClient.refetchQueries({ stale: true })
      history.push(`/results/${getFormattedDate(session.date, false)}`)
    },
  })

  const handleDateChange = (date) => {
    setDate(date)
  }

  const handleCreateSessionClick = (
    matches,
    winnerOfSessionId,
    loserOfSessionId
  ) => {
    const uniqueMatches = matches.filter((match) => match.count && match.played)

    let data = {
      matches: uniqueMatches,
      date: new Date(date),
      winner_id: winnerOfSessionId,
      loser_id: loserOfSessionId,
    }

    createSessionMutate(data)
  }

  if (isLoading) {
    return <Loader style={{ marginTop: "1rem" }} active inline="centered" />
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  return (
    <>
      <Container>
        <div>
          <Route path={`/record-results`}>
            <Scorecard
              players={players}
              date={date}
              handleDateChange={handleDateChange}
              handleCreateSessionClick={handleCreateSessionClick}
            />
          </Route>
        </div>
      </Container>
    </>
  )
}
