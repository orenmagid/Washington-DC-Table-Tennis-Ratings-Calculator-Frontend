import React, { useRef } from "react"
import { Loader, Button, Message } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { useReactToPrint } from "react-to-print"
import SignUpForm from "./SignUpForm"
import { useQuery } from "react-query"
import { fetchPlayers } from "../../api"

export default function PlayerContainer({ handleCreatePlayer }) {
  const {
    data: players,
    error,
    isLoading,
    isError,
  } = useQuery("players", fetchPlayers)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  if (isLoading) {
    return <Loader style={{ marginTop: "1rem" }} active inline="centered" />
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  return (
    <>
      <Message>
        <div className="content">
          <Button onClick={handlePrint}>Print sign up form</Button>
        </div>
      </Message>
      <SignUpForm ref={componentRef} players={players} />
    </>
  )
}
