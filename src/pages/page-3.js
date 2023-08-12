import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ThirdPage = () => (
    <Layout>
        <h1>Hi This is the third Page.</h1>
        <p>Welcome to page 3</p>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
)

export const Head = () => <Seo title="Page two" />

export default ThirdPage
