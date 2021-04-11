import React from "react"
import { Route } from "react-router-dom"
import GroupListTable from "./GroupListTable"
import GroupPlayerTable from "./GroupPlayerTable"
import ErrorMessage from "../../components/ErrorMessage"
import { Loader } from "semantic-ui-react"
import { useQuery } from "react-query"
import { fetchGroups } from "../../api"

export default function GroupContainer() {
  const { data: groups, error, isLoading, isError } = useQuery(
    "groups",
    fetchGroups
  )

  if (isLoading) {
    return <Loader style={{ marginTop: "1rem" }} active inline="centered" />
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  return (
    <>
      <Route path={`/groups`}>
        <GroupListTable groups={groups} />
      </Route>

      <Route path={`/groups/:groupId`}>
        <GroupPlayerTable groups={groups} />
      </Route>
    </>
  )
}
