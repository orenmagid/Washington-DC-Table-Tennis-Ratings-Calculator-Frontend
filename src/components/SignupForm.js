import React, { Component } from 'react'
import { Form, Button, Checkbox, Header, Segment } from 'semantic-ui-react'
import {
  getDefaultDate,
  sortSessions,
  getRatingLimit,
  mostRecentPlayerRating,
} from '../utilities'
import { baseUrl, HEADERS } from '../constants'

export default class signupForm extends Component {
  state = {
    checkedRecurringSessions: this.props.signupForm.player_intents
      .filter((pi) => pi.player_id === this.props.user.id)
      .map((pi) => pi.recurring_session_id),
  }
  componentDidMount() {}

  userIsNotElligible = (recurringSession) => {
    const { user } = this.props
    const rating = mostRecentPlayerRating(user).value

    const disable = rating
      ? rating < recurringSession.low_rating_limit ||
        rating > recurringSession.high_rating_limit
      : true

    return disable
  }

  handleClick = (e, recurringSessionId) => {
    const { checkedRecurringSessions } = this.state
    const alreadyCheckedIndex = checkedRecurringSessions.indexOf(
      recurringSessionId
    )

    if (alreadyCheckedIndex > -1) {
      checkedRecurringSessions.splice(alreadyCheckedIndex, 1)
    } else {
      if (checkedRecurringSessions.length < 2) {
        checkedRecurringSessions.push(recurringSessionId)
      }
    }
    this.setState({ checkedRecurringSessions })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { user, signupForm, fetchSignupForms } = this.props
    const { checkedRecurringSessions } = this.state

    let data = {
      recurring_session_ids: checkedRecurringSessions,
      player_id: user.id,
      active: signupForm.active,
      stage_id: signupForm.stage_id,
      signup_form_id: signupForm.id,
    }

    fetch(`${baseUrl}/player_intents/create_or_update`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(
          '🚀 ~ file: signupForm.js ~ line 33 ~ signupForm ~ .then ~ jsonData',
          jsonData
        )
        fetchSignupForms()
      })
  }

  render() {
    const { signupForm, user } = this.props

    const { checkedRecurringSessions } = this.state

    const submitted = signupForm
      ? signupForm.player_intents.filter(
          (player_intent) => player_intent.player_id === user.id
        ).length > 0
      : false

    const signupClosed = signupForm.stage.id !== 1 || !signupForm.active

    return (
      <Segment>
        <Header as="h3">Weekly Signup Form</Header>

        <Header as="h4">
          Stage {signupForm.stage_id}
          <Header.Subheader>{signupForm.stage.description}</Header.Subheader>
        </Header>
        <Form
          onSubmit={this.handleSubmit}
          style={{ opacity: `${submitted ? 0.5 : 1}` }}
        >
          {sortSessions(signupForm.recurring_sessions).map(
            (recurringSession) => {
              return (
                <Form.Field key={recurringSession.id}>
                  <Checkbox
                    onClick={
                      this.userIsNotElligible(recurringSession)
                        ? null
                        : (e) => this.handleClick(e, recurringSession.id)
                    }
                    checked={
                      checkedRecurringSessions.indexOf(recurringSession.id) > -1
                    }
                    data-value={recurringSession.id}
                    label={`${getDefaultDate(recurringSession, false)} — ${
                      recurringSession.name
                    } — ${getRatingLimit(recurringSession)}`}
                    disabled={
                      this.userIsNotElligible(recurringSession) || signupClosed
                    }
                  />
                </Form.Field>
              )
            }
          )}
          <Button type="submit" disabled={signupClosed}>
            {submitted && !signupClosed
              ? 'Update'
              : signupClosed
              ? 'You may not change your responses at this time'
              : 'Submit'}
          </Button>
        </Form>
      </Segment>
    )
  }
}
