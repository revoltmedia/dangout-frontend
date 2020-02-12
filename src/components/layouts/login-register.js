import React, { useState } from "react"
import FormLoginRegister from "../forms/login-register"
import FormRequestRecovery from "../forms/request-recovery"
import FormVerifyRecovery from "../forms/verify-recovery"
import { navigate } from "gatsby"
import { Button, Divider, Grid, Segment, Header, Container } from 'semantic-ui-react'

/**
 * Login, Register, Forgot Password and Account Recovery layout.
 * @param {Object} props Component props object.
 */
export default (props) => {
  const [ pathName ] = useState( props.location.pathname )
  const loginPath = "/login"
  const registerPath = "/register"
  const requestRecoveryPath = "/forgot-password"
  const verifyRecoveryPath = "recover"
  const [ login, setLogin ] = useState( (pathName.substring(0, loginPath.length) == loginPath)? true : false )

  return (
      <Container>
        <Header inverted as="h2" size="large">
          {props.heading}
        </Header>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              { ( pathName.substring(0, loginPath.length) == loginPath || pathName.substring(0, registerPath.length) == registerPath ) && (
                <FormLoginRegister
                  location={props.location}
                />
              ) }

              { pathName.substring(0, requestRecoveryPath.length) == requestRecoveryPath && (
                <FormRequestRecovery />
              ) }

              { pathName.split('/')[1] == verifyRecoveryPath && (
                <FormVerifyRecovery
                  recoveryToken = { pathName.split('/')[2] }
                />
              ) }
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Button
                href={login ? '/register' : '/login'}
                icon={login ? 'signup' : 'sign in'}
                size='big'
                content={login ? 'Register' : 'Login'}
                onClick={(e) => {
                  e.preventDefault()
                  setLogin( !login )
                  if(login) {
                    navigate('/register')
                  } else {
                    navigate('/login/')
                  }
                }}
              />
              <Button
                href='/forgot-password'
                icon={'sign in'}
                size='small'
                content={'Forgot Password'}
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/forgot-password')
                }}
              />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      </Container>
    )
}
