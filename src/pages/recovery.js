import React from "react"
import Layout from "../components/layouts/layout"
import LayoutLoginRegister from "../components/layouts/login-register"

export default ({ data, location }) => {
  return (
    <Layout>
      <LayoutLoginRegister
        location={location}
        heading='Account Recovery'
      />
    </Layout>
  )
}
