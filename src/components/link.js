import React from "react"
import { Link } from "gatsby"

const ForwardLink = React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
))

export default ForwardLink
