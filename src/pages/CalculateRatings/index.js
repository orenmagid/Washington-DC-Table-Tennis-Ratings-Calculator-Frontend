import React, { useState } from "react"
import Select from "react-select"
import CreateSessionForm from "./CreateSessionForm"
import ErrorMessage from "../../components/ErrorMessage"
import { Loader } from "semantic-ui-react"
import { useQuery } from "react-query"
import { fetchPlayers } from "../../api"

export default function SessionContainer(props) {
  const {
    data: players,
    error,
    isLoading,
    isError,
  } = useQuery("players", fetchPlayers, { refetchOnWindowFocus: false })

  const [sessionPlayers, setSessionPlayers] = useState([])

  const handleChange = (selectedOptions) => {
    const newSessionPlayers = selectedOptions
      .map((selectedOption) => selectedOption.value)
      .sort((a, b) => {
        if (a.most_recent_rating && b.most_recent_rating) {
          return b.most_recent_rating - a.most_recent_rating
        } else {
          return 0
        }
      })
    setSessionPlayers(newSessionPlayers)
  }

  if (isLoading) {
    return <Loader style={{ marginTop: "1rem" }} active inline="centered" />
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  const playerOptions = players
    .filter((player) => !player.hide)
    .map((player) => ({
      label: `${player.name} (${player.most_recent_rating})`,
      value: player,
    }))

  return (
    <>
      <Select
        isMulti
        defaultValue={sessionPlayers}
        onChange={handleChange}
        options={playerOptions}
      />
      <CreateSessionForm players={sessionPlayers} {...props} />
    </>
  )
}
