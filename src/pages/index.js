import React from "react"
import Layout from "../components/layouts/layout"
import UserList from "../components/user-list"

export default ({ data }) => {
  return (
    <Layout>
      <UserList />
    </Layout>
  )
}
