import React from "react"
import { Grid, Segment, Message } from "semantic-ui-react"
import { useMediaQuery } from "react-responsive"

import { getFormattedDate } from "../../utilities"

export default function ResultsTable({
  sessions,
  handleSessionClick,
  activeItem,
}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  })

  return (
    <>
      <Message
        attached
        header="Past Sessions"
        content="Click on a session to see a list of results from that session."
      />
      <Grid columns={isDesktopOrLaptop ? 5 : 2} padded>
        {sessions.map((session, i) => {
          return (
            <Grid.Column
              key={session.date + i}
              onClick={(e) => handleSessionClick(e, session.id)}
              active={activeItem === session.id}
            >
              <Segment>
                {getFormattedDate(
                  session.date,
                  isDesktopOrLaptop ? true : false
                )}
              </Segment>
            </Grid.Column>
          )
        })}
      </Grid>
    </>
  )
}
