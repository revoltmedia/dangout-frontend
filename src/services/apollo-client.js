import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from '../constants'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { authToken } from '../services/auth'

const httpLink = createHttpLink({
  uri: process.env.GATSBY_BACKEND_URI
})

const authLink = setContext((_, { headers }) => {
  const token = authToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
