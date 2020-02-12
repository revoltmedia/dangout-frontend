import { AUTH_TOKEN } from '../constants'
import { AUTH_ID } from '../constants'

export const isBrowser = () => typeof window !== "undefined"

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN)
  localStorage.removeItem(AUTH_ID)
}

export const authId = () => {
  if(isBrowser) {
    const id = localStorage.getItem(AUTH_ID)
    return id
  } else {
    return false
  }
}

export const authToken = () => {
  if(isBrowser) {
    const token = localStorage.getItem(AUTH_TOKEN)
    return token
  } else {
    return false
  }
}

export const loggedInOnly = ( authToken, authID ) => {
  if(isBrowser && (!authToken || !authID)) {
    logout()
    navigate('/login')
    return false
  } else {
    return true
  }
}

export const login = ( id, token ) => {
  localStorage.setItem(AUTH_TOKEN, token)
  localStorage.setItem(AUTH_ID, id)
}

export const checkLoggedIn = () => {
  if(isBrowser){
    const token = localStorage.getItem(AUTH_TOKEN)
    if(token) {
      return true
    } else {
      return false
    }
  }
}
