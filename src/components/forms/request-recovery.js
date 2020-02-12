import React, { useState } from "react"
import { useLazyQuery } from '@apollo/react-hooks'
import { Button, Form, Message } from 'semantic-ui-react'
import { isBrowser } from '../../services/auth'
import { REQUEST_RECOVERY_RESOLVER } from '../../services/queries'
import client from "../../services/apollo-client"

const FormRequestRecovery = ( props ) => {
  const [ email, setEmail ] = useState( '' )
  const [ error, setError ] = useState( '' )
  const [ success, setSuccess ] = useState( '' )

  const RequestRecoveryButton = ( { variables } ) => {
    const [sendRecoveryToken, { called, loading, data, error }] = useLazyQuery(
      REQUEST_RECOVERY_RESOLVER,
      { 
        variables,
        client 
      }
    )
  
    if (called && loading) return <p>Loading ...</p>
  
    if (!called) {
      return (
        <Button
          icon={'sign in'}
          content={'Request Recovery'}
          onClick={() => sendRecoveryToken()}
        />
      )
    }

    if (error) {
      console.error(error)
      setError('There was an error on the backend. Try again in a few minutes and hopefully it\'ll be sorted out.') 
      return (
        <div>
          <Button
            icon={'sign in'}
            content={'Request Recovery'}
            onClick={() => sendRecoveryToken()}
          />
        </div>
      )
    }
  
    if (called && data) {
      if(data.sendRecoveryToken.error) {
        setError(data.sendRecoveryToken.error)
      }
      if(data.sendRecoveryToken.success) {
        setSuccess(data.sendRecoveryToken.success)
      }
      return <p></p>
    }
  
  }
  
  return (
    <Form error={(error)? true : false} success={(success)? true : false}>
      {error && (
        <Message
          icon='user secret'
          error
          header='Error'
          content={error}
        />
      )}
      {success && (
        <Message
          icon='user secret'
          success
          header='Success'
          content={success}
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
      {isBrowser && (
        <RequestRecoveryButton
          variables = {{ email }}
        />
      )}
    </Form>
  )
}

export default FormRequestRecovery
