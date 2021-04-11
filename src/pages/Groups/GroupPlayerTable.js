import React from "react"
import { useQuery } from "react-query"
import { Loader } from "semantic-ui-react"
import PlayerTable from "../../components/PlayerTable"
import ErrorMessage from "../../components/ErrorMessage"
import { fetchGroup } from "../../api"

export default function GroupPlayerTable({ groups, match }) {
  const { data: group, error, isLoading, isError } = useQuery(
    ["group", match.params.groupId],
    () => fetchGroup(match.params.groupId)
  )

  if (isLoading) {
    return <Loader style={{ marginTop: "1rem" }} active inline="centered" />
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  return (
    <>
      <PlayerTable groups={groups} players={group.players} />
    </>
  )
}
