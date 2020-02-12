import React from "react"
import { navigate } from "gatsby"
import { Button, Divider, Form, Grid, Segment, Header, Container, Message } from 'semantic-ui-react'
import { Mutation } from "react-apollo"
import { isBrowser } from '../../services/auth'
import { PASSWORD_RECOVERY_RESOLVER, PASSWORD_CHANGE_MUTATION } from '../../services/queries'
import VerifyToken from '../lazy-query-button'


/**
 * Verify Account Recovery form. Accept token, check token, show change password form, change password.
 */
class FormVerifyRecovery extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      recoveryToken: this.props.recoveryToken,
      password: '',
      passwordVerify: '',
      success: '',
      error: '',
      view: '',
    }
  }

  componentDidMount() {

  }

  render() {
    const { recoveryToken, password, passwordVerify, success, error, view } = this.state

    if( view == 'change-password' ) {
      return (
        <Form error={(error)? true : false}>
          {error && (
            <Message
              icon='user secret'
              error
              header='Error'
              content={error}
            />
          )}
          <Form.Input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder=""
            icon='user'
            iconPosition='left'
            label='New Password'
          />
          <Form.Input
            value={passwordVerify}
            onChange={e => this.setState({ passwordVerify: e.target.value })}
            type="password"
            placeholder=""
            icon='user'
            iconPosition='left'
            label='Verify Password'
          />
          {isBrowser && (
            <Mutation
              mutation={ PASSWORD_CHANGE_MUTATION }
              variables={{ password, recoveryToken }}
              onCompleted={data => this._confirm_change_password(data)}
            >
              {mutation => (
                <Button
                  icon={'sign in'}
                  content={'Change Password'}
                  onClick={mutation} />
              )}
            </Mutation>
          )}
        </Form>
      )
    }
    return (
      <Form error={(error)? true : false}>
        {error && (
          <Message
            icon='user secret'
            error
            header='Error'
            content={error}
          />
        )}
        <Form.Input
          value={recoveryToken}
          onChange={e => this.setState({ recoveryToken: e.target.value })}
          type="text"
          placeholder=""
          icon='user'
          iconPosition='left'
          label='Recovery Token'
        />
        {isBrowser && (
          <VerifyToken
            variables = {{ recoveryToken }}
            query = { PASSWORD_RECOVERY_RESOLVER }
            icon = {'sign in'}
            content = {'Recover Account'}
            callback = { (data) => { this._confirm_check_token(data) } }
          />
        )}
      </Form>
    )
  }

  _confirm_change_password = async data => {
    const { success, error } = data.passwordRecoveryChangePassword

    if(error != false && error != null && error != 'false' && error != '' && this.state.error != error) {
      console.log('error: ' + error)
      this.setState({
        error: error
      })
    } else if(success && this.state.success != success) {
      console.log('success')
      this.setState({
        success: success
      })
      navigate("/login")
    }
  }

  _confirm_check_token = async data => {
    const { success, error } = data.checkRecoveryToken

    if(error != false && error != null && error != 'false' && error != '' && this.state.error != error) {
      console.error(error)
      this.setState({
        error: error,
        view: 'token'
      })
    } else if(success && this.state.success != success) {
      console.log('success')
      this.setState({
        success: success,
        view: 'change-password'
      })
    }
  }
}

export default FormVerifyRecovery
