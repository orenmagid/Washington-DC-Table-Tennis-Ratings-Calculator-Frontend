import React, { Component } from 'react'
import {
  Form,
  Button,
  Checkbox,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'
import { getDefaultDate, sortSessions, getRatingLimit } from '../utilities'
import { baseUrl, HEADERS } from '../constants'

export default class CreateWeeklySignupForm extends Component {
  state = {
    display: false,
  }

  componentDidMount() {}

  handleDisplayClick = (e) => {
    const { display } = this.state
    this.setState({ display: !display })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { fetchSignupForms } = this.props
    const arrayOfCheckedCheckboxes = Array.from(
      e.target.querySelectorAll('input')
    )
      .filter((cb) => cb.checked)
      .map((cb) => {
        return cb.parentElement.dataset.value
      })

    let data = {
      recurring_session_ids: arrayOfCheckedCheckboxes,
    }

    fetch(`${baseUrl}/signup_forms`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(
          '🚀 ~ file: CreateWeeklySignupForm.js ~ line 33 ~ CreateWeeklySignupForm ~ .then ~ jsonData',
          jsonData
        )
        fetchSignupForms()
      })
  }

  render() {
    const { display } = this.state
    const { recurringSessions } = this.props

    return (
      <Segment>
        <Header as="h3">Create Weekly Signup Forms</Header>

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
          {sortSessions(recurringSessions).map((recurringSession) => {
            const ratingLimit = getRatingLimit(recurringSession)
            return (
              <Form.Field key={recurringSession.id}>
                <Checkbox
                  data-value={recurringSession.id}
                  label={`${getDefaultDate(recurringSession, false)} — ${
                    recurringSession.name
                  } — ${ratingLimit}`}
                />
              </Form.Field>
            )
          })}

          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    )
  }
}
