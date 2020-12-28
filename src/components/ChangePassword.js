import React, { Component, Fragment } from 'react'
import { Card, Button, Form, Message } from 'semantic-ui-react'
import { baseUrl, HEADERS } from '../constants'
import { playerId } from '../utilities'

export default class ChangePassword extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    clientError: '',
    validationError: '',
    serverError: '',
    successMessage: false,
  }

  handleChange = (e, field) => {
    switch (field) {
      case 'currentPassword':
        this.setState({ currentPassword: e.target.value })
        break
      case 'newPassword':
        this.setState({ newPassword: e.target.value })
        break
      case 'confirmNewPassword':
        this.setState({ confirmNewPassword: e.target.value })
        break
      default:
        break
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { currentPassword, newPassword, confirmNewPassword } = this.state

    if (newPassword !== confirmNewPassword) {
      this.setState({
        error: {
          content: 'New passwords must match',
          pointing: 'below',
        },
      })
    } else {
      let token = localStorage.getItem('token')
      if (token) {
        fetch(baseUrl + `/players/${playerId()}`, {
          method: 'PATCH',
          body: JSON.stringify({
            player: { password: currentPassword, new_password: newPassword },
          }),
          headers: HEADERS,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              this.setState({
                validationError: null,
                clientError: null,
                serverError: null,
                successMessage: true,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              })
            } else {
              if (data.validation_errors) {
                this.setState({
                  validationError: data.validation_errors,
                })
              } else {
                this.setState({ serverError: 'Invalid password' })
              }
            }
          })
      }
    }
  }

  render() {
    const {
      clientError,
      serverError,
      validationError,
      successMessage,
    } = this.state

    const regex = "? < > ' , ? [ ] } { = - ) ( * & ^ % $ # ` ~ { } !"

    return (
      <Fragment>
        <Card>
          <Card.Content>
            <Card.Header>Change Your Password</Card.Header>
            {successMessage ? (
              <Message
                style={{ marginBottom: '1rem' }}
                content="Your password was successfully changed."
              />
            ) : null}
            <Card.Description>
              Passwords must contain at least one of each: lowercase letters,
              uppercase letters, special characters ({regex}), and numbers.
            </Card.Description>
            <Form style={{ marginTop: '1rem' }} onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                type="password"
                label="Current Password"
                placeholder="Current Password"
                onChange={(e) => this.handleChange(e, 'currentPassword')}
                error={serverError ? serverError : null}
              />
              <Form.Input
                fluid
                type="password"
                label="New Password"
                placeholder="New Password"
                onChange={(e) => this.handleChange(e, 'newPassword')}
                error={validationError ? validationError : null}
              />
              <Form.Input
                fluid
                type="password"
                label="Confirm New Password"
                placeholder="Confirm New Password"
                onChange={(e) => this.handleChange(e, 'confirmNewPassword')}
                error={
                  clientError
                    ? clientError
                    : validationError
                    ? validationError
                    : null
                }
              />
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Content>
        </Card>
      </Fragment>
    )
  }
}
