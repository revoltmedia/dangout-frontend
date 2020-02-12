import React from "react"
import { Card, Icon, Container, Message } from "semantic-ui-react"
import { Query } from "react-apollo"
import { isBrowser, checkLoggedIn } from "../services/auth"
import { USERS_LIST } from "../services/queries"

export default (props) => {
  return (
    <Container>
      {!checkLoggedIn() && (
        <Message>
          <p>Login to see stuff.</p>
        </Message>
      )}
      {checkLoggedIn() && (
      <Card.Group>
        {isBrowser && (
            <Query
              query={USERS_LIST}
            >
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error: {error}</div>
                if (data.error) return <div>Error: {data.error}</div>

                const usersRender = data.users
                if (!error && !data.error) {
                  return (
                    usersRender.map(user =>
                      <Card
                        key={user.id}
                        id={user.id}
                        image='https://react.semantic-ui.com/images/wireframe/image.png'
                        header={user.handle}
                        meta='Friend'
                        description={user.bio}
                        extra={
                          <a>
                            <Icon name='user' />
                            {user.email}
                          </a>
                        }
                      />
                    )
                  )
                }
            }}
            </Query>
        )}
        
      </Card.Group>
      )}
    </Container>
  )
}
