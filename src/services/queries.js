import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
mutation(
  $email: String!
  $handle: String!
  $password: String!
) {
    registerUser(
      email: $email,
      handle: $handle,
      password: $password
    ) {
      id
      email
      password
      handle
      token
      error
    }
}
`

const LOGIN_RESOLVER = gql`
query(
  $email: String!
  $password: String!
) {
    loginUser(
      identifier: $email,
      password: $password,
    ) {
      id
      email
      password
      handle
      token
      error
    }
}
`

const PASSWORD_RECOVERY_RESOLVER = gql`
query(
  $recoveryToken: String!
) {
    checkRecoveryToken(
      recoveryToken: $recoveryToken,
    ) {
      success,
      error
    }
}
`

const PASSWORD_CHANGE_MUTATION = gql`
mutation(
  $recoveryToken: String!
  $password: String!
) {
    recoveryChangePassword(
      recoveryToken: $recoveryToken,
      password: $password,
    ) {
      success,
      error
    }
}
`

const REQUEST_RECOVERY_RESOLVER = gql`
query(
  $email: String!
) {
    sendRecoveryToken(
      identifier: $email,
    ) {
      success
      error
    }
}
`

const USERS_LIST = gql`
    {
      users {
        email
        handle
        id
      }
    }
  `

const USER_LOOKUP_MUTATION = gql`
mutation(
  $id: String!
) {
    userEdit(
      id: $id
    ) {
      id
      email
      handle
      error
    }
}
`

const EDIT_PROFILE_MUTATION = gql`
mutation(
  $id: String!
  $email: String
  $password: String
  $bio: String
) {
    userEdit(
      id: $id,
      email: $email,
      password: $password,
      bio: $bio
    ) {
      email
      password
      handle
      bio
    }
}
`

const GET_PROFILE_QUERY = gql`
query(
  $id: String!
) {
    user(
      id: $id
    ) {
      email
      password
      handle
      bio
    }
}
`

export {
  SIGNUP_MUTATION,
  LOGIN_RESOLVER,
  PASSWORD_RECOVERY_RESOLVER,
  PASSWORD_CHANGE_MUTATION,
  USERS_LIST,
  USER_LOOKUP_MUTATION,
  REQUEST_RECOVERY_RESOLVER,
  EDIT_PROFILE_MUTATION,
  GET_PROFILE_QUERY
}