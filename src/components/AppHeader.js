import React from "react"
import { Link } from "react-router-dom"
import { Header, Segment, Button, Message } from "semantic-ui-react"
import Nav from "./Nav"

export default function AppHeader({ handleLogout }) {
  return (
    <header>
      <Segment clearing>
        <Header as="h1" floated="left">
          WDCTT Ratings
        </Header>

        {localStorage.getItem("token") ? (
          <Link
            to="/login"
            onClick={handleLogout}
            component={Button}
            style={{ float: "right" }}
          >
            Log Out
          </Link>
        ) : (
          <Link to="/login" component={Button} style={{ float: "right" }}>
            Log In
          </Link>
        )}
      </Segment>
      <Nav />
      <Message
        style={{ marginBottom: "1rem" }}
        content={`On 6/16/2021, the structure of the league changed. The long and short of it is that "groups" are no longer relevant. This makes certain updates to this site necessary before results can be input and ratings can be updated. Rest assured, I'm working on making those updates as quickly as I can, and we'll update ratings as soon as possible. But, it may be a few weeks before new results show up here. Otherwise, if you see something wrong, or have questions, email Oren Magid at oren.michael.magid@gmail.com.`}
      />
    </header>
  )
}
