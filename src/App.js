import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { baseUrl } from "./constants"
import { Container, Segment } from "semantic-ui-react"
import AppHeader from "./components/AppHeader"
import Players from "./pages/Players"
import Results from "./pages/Results"
import SignUpForm from "./pages/SignUpForm"
import LoginForm from "./components/LoginForm"
import CalculateRatingsContainer from "./pages/CalculateRatings"

export default function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()

    let params = {
      player: {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      },
    }

    fetch(baseUrl + "/login", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.jwt)
          localStorage.setItem("admin", data.player.admin)
          localStorage.setItem("user", JSON.stringify(data.player))
          // This is just to get the component to rerender, which triggers the redirect to /players. Obviously, not a good solution.
          setUser(data.player)
        } else {
          alert("Invalid username or password")
        }
      })
  }

  const handleLogout = () => {
    localStorage.clear()
  }

  const handleCreatePlayer = () => {}

  return (
    <Router>
      <Container style={{ padding: "1rem" }}>
        <Route path="/">
          <AppHeader handleLogout={handleLogout} />
        </Route>
        <main>
          <Switch>
            <Segment>
              <Route exact path="/">
                <Redirect to="/players" />
              </Route>
              <Route path="/login">
                {!localStorage.getItem("token") ? (
                  <LoginForm handleLogin={handleLogin} />
                ) : (
                  <Redirect to="/players" />
                )}
              </Route>
              <Route path="/players">
                <Players handleCreatePlayer={handleCreatePlayer} />
              </Route>
              <Route path="/results">
                <Results />
              </Route>
              <Route path={["/sign-up-form", "/signup-form"]}>
                <SignUpForm />
              </Route>
              {localStorage.getItem("token") ? (
                <Route path="/record-results">
                  <CalculateRatingsContainer path="/record-results" />
                </Route>
              ) : null}
            </Segment>
          </Switch>
        </main>
      </Container>
    </Router>
  )
}
