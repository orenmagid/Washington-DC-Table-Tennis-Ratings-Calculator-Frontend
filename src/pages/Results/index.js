import React from "react"
import { useQuery } from "react-query"
import { Route, useHistory } from "react-router-dom"
import ResultsTable from "./ResultsTable"
import MatchesTable from "./MatchesTable"
import { Loader } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { fetchSessions } from "../../api"
import { getFormattedDate } from "../../utilities"

export default function SessionContainer(props) {
  const {
    data: sessions,
    error,
    isLoading,
    isError,
  } = useQuery("sessions", fetchSessions)
  let history = useHistory()

  const handleSessionClick = (date) => {
    const formattedDate = getFormattedDate(date, false)
    history.push(`/results/${formattedDate}`)
  }

  if (isLoading) {
    return <Loader style={{ marginTop: "1rem" }} active inline="centered" />
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  return (
    <>
      <Route path={`/results/:sessionId`}>
        <MatchesTable />
      </Route>
      <Route exact path={`/results`}>
        <ResultsTable
          sessions={sessions}
          handleSessionClick={handleSessionClick}
        />
      </Route>
    </>
  )
}
