import React, { Component, Fragment } from 'react'
import { Router, Link, navigate } from '@reach/router'
import { baseUrl, HEADERS } from './constants'
import { Container, Segment, Header, Button, Message } from 'semantic-ui-react'
import Nav from './components/Nav'
import PlayerContainer from './containers/PlayerContainer'
import SessionContainer from './containers/SessionContainer'
import MyProfileContainer from './containers/MyProfileContainer'
import LoginForm from './components/LoginForm'
import CalculateRatings from './components/CalculateRatings'
import { isLoggedIn, playerId } from './utilities'

export default class App extends Component {
  state = {
    loading: false,
    activeItem: 'players',
    recurringSessions: [],
    players: [],
    loggedIn: false,
    error: '',
    user: {},
  }

  handleLogin = (e) => {
    e.preventDefault()

    let params = {
      player: {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      },
    }

    this.setState({ error: '' })

    fetch(baseUrl + '/login', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.jwt)
          localStorage.setItem('admin', data.player.admin)
          localStorage.setItem('player_id', data.player.id)

          this.setState({
            error: '',
            loggedIn: true,
            user: data.player,
          })
          navigate('/')
        } else {
          this.setState({ error: 'Invalid username or password' })
          alert('Invalid username or password')
        }
      })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({ loggedIn: false })
  }

  fetchRecurringSessions = () => {
    this.setState({ loading: true, recurringSessions: [] })

    // let token = localStorage.getItem('token')
    // if (token) {
    fetch(baseUrl + '/recurring_sessions', {
      // headers: HEADERS,
    })
      .then((res) => res.json())
      .then((recurringSessions) => {
        console.log('App -> RecurringSessions', recurringSessions)

        this.setState({ recurringSessions, loading: false })
      })
      .catch((e) => console.error(e))
    // }
  }

  fetchPlayers = () => {
    this.setState({ loading: true, players: [] })

    // let token = localStorage.getItem('token')
    // if (token) {
    fetch(baseUrl + '/players', {
      // headers: HEADERS,
    })
      .then((res) => res.json())
      .then((players) => {
        const sortedPlayers = players.sort((a, b) => {
          if (a.ratings.length > 0 && b.ratings.length > 0) {
            const sortedARatings = a.ratings.sort((a, b) => a.id - b.id)
            const sortedBRatings = b.ratings.sort((a, b) => a.id - b.id)

            return (
              sortedBRatings[sortedBRatings.length - 1].value -
              sortedARatings[sortedARatings.length - 1].value
            )
          } else {
            return 0
          }
        })

        this.setState({
          players: sortedPlayers,
          loading: false,
        })
      })
      .catch((e) => console.error(e))
    // }
  }

  handleCreatePlayer = () => {}

  handleNavClick = (item) => {
    this.setState({ activeItem: item })
  }

  handleLoginClick = () => {
    this.handleNavClick('')
  }

  setActiveItem = () => {
    const path = window.location.pathname
    let activeItem
    if (path.indexOf('sessions') > -1) {
      activeItem = 'sessions'
    } else if (path.indexOf('record-results') > -1) {
      activeItem = 'record-results'
    } else {
      activeItem = 'players'
    }
    this.setState({ activeItem })
  }

  fetchUser = () => {
    if (isLoggedIn()) {
      let token = localStorage.getItem('token')
      if (token) {
        fetch(baseUrl + `/players/${playerId()}`, {
          headers: HEADERS,
        })
          .then((res) => res.json())
          .then((player) => {
            this.setState({
              error: '',
              loggedIn: true,
              user: player,
            })
          })
          .catch((e) => console.error(e))
      }
    }
  }
  componentDidMount() {
    this.setActiveItem()
    this.fetchRecurringSessions()
    this.fetchPlayers()
    this.fetchUser()
  }

  render() {
    const { user, groups, players, loading, activeItem } = this.state

    return (
      <Container style={{ padding: '1rem' }}>
        <div>
          <Segment clearing>
            <Header as="h1" floated="left">
              WDCTT Ratings
            </Header>
            {localStorage.getItem('token') ? (
              <Link to="/login" onClick={this.handleLogout}>
                <Button floated="right">Log Out</Button>
              </Link>
            ) : (
              <Link to="/login" onClick={() => this.handleLoginClick()}>
                <Button floated="right">Log In</Button>
              </Link>
            )}
          </Segment>
          <Nav activeItem={activeItem} handleNavClick={this.handleNavClick} />
          <Message
            style={{ marginBottom: '1rem' }}
            content="If you see something wrong, or have questions, email Oren Magid at oren.michael.magid@gmail.com."
          />
        </div>
        <Router>
          <Segment path="/">
            <Fragment>
              <PlayerContainer
                path="/"
                loading={loading}
                user={user}
                groups={groups}
                players={players}
                handleCreatePlayer={this.handleCreatePlayer}
              />
              <SessionContainer path="/sessions" user={user} />
              {localStorage.getItem('token') ? (
                <CalculateRatings path="/record-results" user={user} />
              ) : null}
              {localStorage.getItem('token') ? (
                <MyProfileContainer path="/my-profile" user={user} />
              ) : null}
            </Fragment>

            {!isLoggedIn() ? (
              <LoginForm path="login" handleLogin={this.handleLogin} />
            ) : null}
          </Segment>
        </Router>
      </Container>
    )
  }
}
