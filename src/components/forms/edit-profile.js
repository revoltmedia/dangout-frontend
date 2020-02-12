import React, { useState } from "react"
import { Mutation, Query } from "react-apollo"
import { Container } from "semantic-ui-react"
import { EDIT_PROFILE_MUTATION, GET_PROFILE_QUERY } from '../../services/queries'
import { authToken, authId, isBrowser, loggedInOnly } from '../../services/auth'

export default () => {

  loggedInOnly( authToken, authId )

  const id = authId
  let [ email, setEmail ] = useState( authId )
  let [ password, setPassword ] = useState( authId )
  let [ handle, setHandle ] = useState( authId )
  let [ bio, setBio ] = useState( authId )

  return (
    <Container>
      
        { isBrowser && (
        <Query
          query={ GET_PROFILE_QUERY }
          variables={{ id }}
        >
          <form>
            {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error: {error}</div>

                const user = data.user

                setEmail(user.email)
                setPassword(user.password)
                setHandle(user.handle)
                setBio(user.bio)

                return (
                  <div>
                    <h4>Edit Your Profile</h4>
                    <div>
                      <h5>{handle}</h5>
                      <p>
                        <input
                          value={user.email}
                          onChange={e => setEmail({ email: e.target.value })}
                          type="text"
                          placeholder="Your email address"
                        />
                      </p>
                      <p>
                        <input
                          value={user.handle}
                          onChange={e => setHandle({ email: e.target.value })}
                          type="text"
                          placeholder="Your handle"
                        />
                      </p>
                      <p>
                        <input
                          value={user.password}
                          onChange={e => setPassword({ password: e.target.value })}
                          type="password"
                          placeholder="Your password"
                        />
                      </p>
                      <p>
                        <input
                          value={user.bio}
                          onChange={e => setBio({ bio: e.target.value })}
                          type="text"
                          placeholder="Your bio"
                        />
                      </p>
                    </div>
                    <div>
                      <Mutation
                        mutation={EDIT_PROFILE_MUTATION}
                        variables={{ id, email, password, bio, handle }}
                        // onCompleted={data => this._confirm(data)}
                      >
                        {mutation => (
                          <div
                            onClick={mutation}>
                            Make it so
                          </div>
                        )}
                      </Mutation>
                    </div>
                  </div>
                )
            }}
          </form>
        </Query>
        ) }
      
    </Container>
  )
}
