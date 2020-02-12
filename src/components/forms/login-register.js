import React, { useState } from "react"
import { navigate } from "gatsby"
import { useLazyQuery } from '@apollo/react-hooks'
import { Button, Form, Message } from 'semantic-ui-react'
import { Mutation } from "react-apollo"
import { isBrowser, login, checkLoggedIn } from '../../services/auth'
import { LOGIN_RESOLVER, SIGNUP_MUTATION } from "../../services/queries"
import client from "../../services/apollo-client"

/**
 * Shows a login button which will call LOGIN_RESOLVER via useLazyQuery on click.
 * @param {Object} param0 Parameters to be passed to useLazyQuery ex. { email, password }
 */
function LoginButton( { variables } ){
  const [loginQuery, { called, loading, data, error }] = useLazyQuery(
    LOGIN_RESOLVER,
    { 
      variables,
      client 
    }
  );

  if (error) return (
    <div>
      <p>{error.message}</p> 
      <Button
        icon={'sign in'}
        content={'Login'}
        onClick={() => loginQuery()}
      />
    </div>
  )

  if (called && loading) return <p>Loading ...</p>

  if (!called) {
    return (
      <Button
        icon={'sign in'}
        content={'Login'}
        onClick={() => loginQuery()}
      />
    )
  }

  if(called && data) {
    if (loginSignupConfirm(data.loginUser)) {
      return <p>Logging you in...</p>
    }
  }
}

/**
 * Checks for errors, then checks for token and sets up login id and token in localstorage via login(). Then redirects to /
 * @param {Object} data 
 */
async function loginSignupConfirm(data) {
  const { token, id, error } = data
  
  if(error != null) {
    return(
      error
    );
  } else if(token) {
    login(id, token)
    navigate("/")
  }
}

/**
 * Displays a form for login or register depending on props.location.pathname
 * @param {Object} props Component properties.
 */
const FormLoginRegister = ( props ) => {

  const [ isLoginForm ] = useState( 
    ( props.location.pathname.startsWith('/login') )? true : false 
  )
  const [ email, setEmail ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ handle, setHandle ] = useState( '' )
  const [ error, setError ] = useState( '' )
  const [ isLoggedIn ] = useState( checkLoggedIn() )

  return (
    <Form error={(error)? true : false} success={(isLoggedIn)? true : false}>
      {error && (
        <Message
          icon='user secret'
          error
          header='Error'
          content={error}
        />
      )}
      {isLoggedIn && (
        <Message
          icon='user secret'
          success
          header='Success'
          content="You've successfully logged in."
        />
      )}
      {!isLoginForm && (
        <Form.Input
          value={handle}
          onChange={e => setHandle( e.target.value )}
          type="text"
          placeholder="Your handle"
          icon='user'
          iconPosition='left'
          label='Handle'
        />
      )}
      <Form.Input
        value={email}
        onChange={e => setEmail( e.target.value )}
        type="text"
        placeholder="you@there.com"
        icon='user'
        iconPosition='left'
        label='Email'
      />
      <Form.Input
        value={password}
        onChange={e => setPassword( e.target.value )}
        type="password"
        placeholder="Password"
        icon='lock'
        iconPosition='left'
        label='Password'
      />
      {isBrowser && isLoginForm && (
        <LoginButton
          variables={{ email, password }}
        />
      )}
      {isBrowser && !isLoginForm && (
        <Mutation
          mutation={SIGNUP_MUTATION}
          variables={{ email, password, handle }}
          onCompleted={data => loginSignupConfirm(data.registerUser)}
        >
          {mutation => (
            <Button
              icon={'signup'}
              content={'Register'}
              onClick={mutation} />
          )}
        </Mutation>
      )}
    </Form>
  )
}

export default FormLoginRegister
