import React from "react"
import Layout from "../components/layouts/layout"
import LayoutLoginRegister from "../components/layouts/login-register"

export default (props) => {
  return (
    <Layout>
      <LayoutLoginRegister
        location={props.location}
        heading='Request Password Recovery'
      />
    </Layout>
  )
}
