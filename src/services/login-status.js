import React, { PropTypes, Children } from "react"

class LoginStatusProvider extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        this.isLoggedIn()
    }

    componentDidUpdate() {
        this.isLoggedIn()
    }

    isLoggedIn() {
      if(isBrowser){
        const token = localStorage.getItem(AUTH_TOKEN)
  
        if(token) {
          return true
        } else if(this.state.loggedIn && !token) {
          return false
        }
      }
    }

    // static propTypes = {
    //     loggedIn: PropTypes.object.isRequired,
    // }

    // static childContextTypes = {
    //     loggedIn: PropTypes.object.isRequired,
    // }

    getChildContext() {
        const { loggedIn } = this.props
        return { loggedIn }
    }
    
    render() {
        return Children.only(this.props.children)
    }
}

export default LoginStatusProvider