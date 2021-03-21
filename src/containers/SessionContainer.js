import React, { Component, Fragment } from 'react'
import SessionTable from '../components/SessionTable'
import CreateWeeklySignupForm from '../components/CreateWeeklySignupForm'
import EditWeeklySignupForm from '../components/EditWeeklySignupForm'
import MatchesTable from '../components/MatchesTable'
import SignupForm from '../components/SignupForm'
import { Loader } from 'semantic-ui-react'
import { baseUrl, HEADERS } from '../constants'

export default class SessionContainer extends Component {
  state = {
    sessions: [],
    matches: [],
    activeItem: null,
  }

  fetchSessions = () => {
    // let token = localStorage.getItem('token')
    // if (token) {
    fetch(baseUrl + '/sessions', {
      // headers: HEADERS,
    })
      .then((res) => res.json())
      .then((sessions) => {
        this.setState({ sessions })
      })
      .catch((e) => console.error(e))
    // }
  }

  handleSessionClick = (e, session_id) => {
    const { sessions } = this.state
    this.setState({
      activeItem: session_id,
      matches: sessions.find((session) => session.id === session_id).matches,
    })
  }

  componentDidMount() {
    this.fetchSessions()
  }

  render() {
    const { sessions, activeItem, matches } = this.state
    const {
      user,
      recurringSessions,
      signupForms,
      fetchSignupForms,
    } = this.props

    return (
      <Fragment>
        {signupForms.length > 0
          ? signupForms.map((signupForm) => {
              return (
                <SignupForm
                  key={signupForm.id}
                  signupForm={signupForm}
                  user={user}
                  fetchSignupForms={fetchSignupForms}
                />
              )
            })
          : null}
        {user.admin && signupForms.length > 0 ? (
          <EditWeeklySignupForm
            user={user}
            signupForms={signupForms}
            recurringSessions={recurringSessions}
            fetchSignupForms={fetchSignupForms}
          />
        ) : null}
        {user.admin ? (
          <CreateWeeklySignupForm
            recurringSessions={recurringSessions}
            fetchSignupForms={fetchSignupForms}
          />
        ) : null}
        {sessions.length > 0 ? (
          <SessionTable
            sessions={sessions}
            activeItem={activeItem}
            handleSessionClick={this.handleSessionClick}
          />
        ) : (
          <Loader style={{ marginTop: '1rem' }} active inline="centered" />
        )}

        {activeItem ? <MatchesTable matches={matches} /> : null}
      </Fragment>
    )
  }
}
