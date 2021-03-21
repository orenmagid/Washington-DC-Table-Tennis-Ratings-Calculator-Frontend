import React, { Component } from 'react'
import {
  Form,
  Button,
  Checkbox,
  Card,
  Icon,
  Segment,
  Header,
} from 'semantic-ui-react'
import PlayerIntents from './PlayerIntents'
import { getDefaultDate, sortSessions, getRatingLimit } from '../utilities'
import { baseUrl, HEADERS } from '../constants'

export default class EditWeeklySignupForm extends Component {
  state = {
    display: false,
    signupForm: this.props.signupForms[0] || {},
    checkedRecurringSessions: this.props.signupForms[0].recurring_sessions.map(
      (ri) => ri.id
    ),
  }

  componentDidMount() {}

  handleDisplayClick = (e) => {
    const { display } = this.state
    this.setState({ display: !display })
  }

  handleRecurringSessionsClick = (e, recurringSessionId) => {
    const { checkedRecurringSessions } = this.state
    const alreadyCheckedIndex = checkedRecurringSessions.indexOf(
      recurringSessionId
    )

    if (alreadyCheckedIndex > -1) {
      checkedRecurringSessions.splice(alreadyCheckedIndex, 1)
    } else {
      checkedRecurringSessions.push(recurringSessionId)
    }
    this.setState({ checkedRecurringSessions })
  }

  handleActiveClick = (e) => {
    const { signupForm } = this.state
    const { active } = signupForm

    this.setState({ signupForm: { ...signupForm, active: !active } })
  }

  handleStageChange = (e, { value }) => {
    const { signupForm } = this.state
    this.setState({ signupForm: { ...signupForm, stage_id: value } })
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { signupForm } = this.state
    const signupFormId = signupForm.id
    const { fetchSignupForms } = this.props

    fetch(`${baseUrl}/signup_forms/${signupFormId}`, {
      method: 'DELETE',
      headers: HEADERS,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(
          '🚀 ~ file: EditWeeklySignupForm.js ~ line 38 ~ EditWeeklySignupForm ~ .then ~ jsonData',
          jsonData
        )

        fetchSignupForms()
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { signupForm, checkedRecurringSessions } = this.state
    const { fetchSignupForms, user } = this.props

    let data = {
      recurring_session_ids: checkedRecurringSessions,
      player_id: user.id,
      signup_form_id: signupForm.id,
      stage_id: signupForm.stage_id,
      active: signupForm.active,
    }

    fetch(`${baseUrl}/signup_forms/${signupForm.id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(
          '🚀 ~ file: EditWeeklySignupForm.js ~ line 38 ~ EditWeeklySignupForm ~ .then ~ jsonData',
          jsonData
        )

        fetchSignupForms()
      })
  }

  render() {
    const { display, signupForm, checkedRecurringSessions } = this.state
    const { recurringSessions, user } = this.props

    return (
      <Segment>
        <Header as="h3">Edit Weekly Signup Forms</Header>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Icon
            onClick={this.handleDisplayClick}
            name={display ? 'eye slash' : 'eye'}
            size="large"
          />
        </div>
        <Form
          onSubmit={this.handleSubmit}
          style={{ display: `${display ? 'block' : 'none'}` }}
        >
          <Card fluid>
            <Button
              onClick={(e) => {
                if (
                  window.confirm('Are you sure you wish to delete this item?')
                )
                  this.handleDelete(e)
              }}
            >
              Delete
            </Button>

            <Card.Content>
              <Header as="h4">
                Week of{' '}
                {getDefaultDate(
                  sortSessions(signupForm.recurring_sessions)[0],
                  false
                )}
              </Header>
              <Form.Field>
                <Checkbox
                  toggle
                  onClick={this.handleActiveClick}
                  checked={signupForm.active}
                  data-value={signupForm.id}
                  label="active"
                />
              </Form.Field>
              <Form.Group inline>
                {recurringSessions.map((recurringSession) => {
                  return (
                    <Form.Field key={recurringSession.id}>
                      <Checkbox
                        onClick={(e) =>
                          this.handleRecurringSessionsClick(
                            e,
                            recurringSession.id
                          )
                        }
                        checked={
                          checkedRecurringSessions.indexOf(
                            recurringSession.id
                          ) > -1
                        }
                        label={`${getDefaultDate(recurringSession, false)} — ${
                          recurringSession.name
                        } — ${getRatingLimit(recurringSession)}`}
                      />
                    </Form.Field>
                  )
                })}
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Stage 1"
                    name="checkboxRadioGroup"
                    value={1}
                    checked={signupForm.stage_id === 1}
                    onChange={this.handleStageChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Stage 2"
                    name="checkboxRadioGroup"
                    value={2}
                    checked={signupForm.stage_id === 2}
                    onChange={this.handleStageChange}
                  />
                </Form.Field>
              </Form.Group>
              <PlayerIntents signupForm={signupForm} />
            </Card.Content>
            <Button type="submit">Submit</Button>
          </Card>
        </Form>
      </Segment>
    )
  }
}
