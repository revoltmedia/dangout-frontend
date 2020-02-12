import React from "react"
import { Icon, Container } from "semantic-ui-react"
import { Link } from "gatsby"

export default () => (
    <footer>
      <Container>
        <Link to={`/`}>
          <h3>
            <Icon name='user' />Dangout
          </h3>
        </Link>
        <div className="disclaimer">
        </div>
      </Container>
    </footer>
)
