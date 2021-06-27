import React from "react"
import { Grid, Segment, Message } from "semantic-ui-react"
import { useMediaQuery } from "react-responsive"
import { getFormattedDate } from "../../utilities"

export default function ResultsTable({ sessions, handleSessionClick }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  })

  const uniqueDates = [...new Set(sessions.map((session) => session.date))]

  return (
    <>
      <Message
        attached
        header="Past Sessions"
        content="Click on a session to see a list of results from that session."
      />
      <Grid columns={isDesktopOrLaptop ? 5 : 2} padded>
        {uniqueDates.map((date, i) => {
          return (
            <Grid.Column key={date} onClick={() => handleSessionClick(date)}>
              <Segment>
                {getFormattedDate(date, isDesktopOrLaptop ? true : false)}
              </Segment>
            </Grid.Column>
          )
        })}
      </Grid>
    </>
  )
}
