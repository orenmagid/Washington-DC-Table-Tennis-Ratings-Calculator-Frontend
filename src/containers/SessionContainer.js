import React, { Component, Fragment } from 'react'
import SessionTable from '../components/SessionTable'
import { baseUrl } from '../constants'

export default class SessionContainer extends Component {
  state = {
    sessions: [],
  }

  fetchSessions = () => {
    let token = localStorage.getItem('token')
    if (token) {
      fetch(baseUrl + '/sessions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((sessions) => {
          this.setState({ sessions })
        })
        .catch((e) => console.error(e))
    }
  }

  handleClick = () => {
    this.setState({ displayForm: true })
  }
  componentDidMount() {
    this.fetchSessions()
  }

  render() {
    const { sessions } = this.state

    return (
      <Fragment>
        <SessionTable sessions={sessions} />
      </Fragment>
    )
  }
}
