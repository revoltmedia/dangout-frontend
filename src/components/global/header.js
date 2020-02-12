import React, { useState } from 'react'
import { Link, navigate } from "gatsby"
import ForwardLink from "../link"
import { Menu, Button, Dropdown, Header, Icon } from "semantic-ui-react"

import { logout, checkLoggedIn } from "../../services/auth"

export default (props) => {
  const [isLoggedIn, setLoggedIn] = useState( checkLoggedIn() )
  
  return (
  <header>
      <Menu fixed='top' inverted stackable size='mini'>
        <Menu.Item>
          <Header as="h1" size="tiny">
            <Link to={`/`}>
              <Icon name='user' />Dangout
            </Link>
          </Header>
        </Menu.Item>
        <Menu.Menu position='right'>
          {
            isLoggedIn ? (
              <Dropdown item text='Account'>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Button
                      icon="signup"
                      as={ForwardLink}
                      to="/edit-profile"
                      content="Edit Profile"
                    />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      href=""
                      icon="sign out"
                      content="Logout"
                      onClick={(e) => {
                        e.preventDefault()
                        logout()
                        setLoggedIn(false)
                        navigate("/")
                      }}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : ''
          }
          {
            !isLoggedIn ? (
              <Menu.Item>
                <Button.Group>
                  <Button
                    as={ForwardLink}
                    to='/login'
                    icon="sign in"
                    primary
                    content="Login"
                  />
                    <Button.Or />
                    <Button
                      as={ForwardLink}
                      to='/register'
                      positive
                      icon="signup"
                      primary
                      content="Register"
                    />
                </Button.Group>
              </Menu.Item>
            ) : ''
          }
        </Menu.Menu>
      </Menu>
  </header>
  )
}
