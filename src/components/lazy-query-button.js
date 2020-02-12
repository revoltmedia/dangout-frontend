import React from "react"
import { useLazyQuery } from '@apollo/react-hooks'
import { Button } from 'semantic-ui-react'
import client from "../services/apollo-client"

/**
 * A button that triggers useLazyQuery according to properties.
 * @param {Object} variables Variables passed to useLazyQuery. ex: {email, password}
 * @param {Object} query GQL Query Passed to useLazyQuery
 * @param {string} icon Icon for the button.
 * @param {string} content Text for the button.
 * @param {callback} callback Callback on success.
 */
export default ( props ) => {
    const { query, icon, content, callback } = props
    const variables = props.variables

    const [lazyQuery, { called, loading, data, error }] = useLazyQuery(
        query,
        { 
            variables,
            client 
        }
    )

    if (error || (data && data.error)) {
        if (error) {
            var showError = error.message
        } else if( data.error ) {
            var showError = data.error
        }

        return (
            <div>
                <p>{showError}</p> 
                <Button
                icon={icon}
                content={content}
                onClick={() => lazyQuery()}
                />
            </div>
        )
    }
  
    if (called && loading) return <p>Loading ...</p>
  
    if (!called) {
      return (
        <div>
            <Button
            icon={icon}
            content={content}
            onClick={() => lazyQuery()}
            />
        </div>
      )
    }
  
    if(data) {
        callback( data )
        return(
            <div>
                <Button
                icon={icon}
                content={content}
                onClick={() => lazyQuery()}
                />
            </div>
        )
    }
  }