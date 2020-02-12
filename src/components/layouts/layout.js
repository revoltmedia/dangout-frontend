import React from "react"
import { Helmet } from "react-helmet"
import { ApolloProvider } from 'react-apollo'
import client from '../../services/apollo-client'
import 'semantic-ui-css/semantic.min.css'
import '../../scss/main.scss'
import SiteHeader from "../global/header"
import Footer from "../global/footer"

export default ({ children }) => (
  <ApolloProvider client={client}>
      <Helmet defaultTitle="Dangout" titleTemplate={`%s | Dangout`}>
        <html lang="en" />
        <link rel="canonical" href="https://www.revoltmedia.com/" />
        <meta name="docsearch:version" content="2.0" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
        />

        <meta property="og:url" content="https://www.revoltmedia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Dangout" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="/assets/images/facebook-opengraph/og-image.jpg" />
        <meta property="og:image:height" content="372" />
        <meta property="og:image:width" content="711" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="" />

        <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/favicons/apple-touch-icon-57x57.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/favicons/apple-touch-icon-60x60.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/favicons/apple-touch-icon-72x72.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/favicons/apple-touch-icon-76x76.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/favicons/apple-touch-icon-114x114.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/favicons/apple-touch-icon-120x120.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/favicons/apple-touch-icon-144x144.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/favicons/apple-touch-icon-152x152.png?v=00zdL7O026" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons/apple-touch-icon-180x180.png?v=00zdL7O026" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons/favicon-32x32.png?v=00zdL7O026" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicons/android-chrome-192x192.png?v=00zdL7O026" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons/favicon-16x16.png?v=00zdL7O026" />
        <link rel="manifest" href="/assets/images/favicons/site.webmanifest?v=00zdL7O026" />
        <link rel="mask-icon" href="/assets/images/favicons/safari-pinned-tab.svg?v=00zdL7O026" color="#61391b" />
        <link rel="shortcut icon" href="/assets/images/favicons/favicon.ico?v=00zdL7O026" />
        <meta name="apple-mobile-web-app-title" content="Dangout" />
        <meta name="application-name" content="Dangout" />
        <meta name="msapplication-TileColor" content="#61391b" />
        <meta name="msapplication-TileImage" content="/assets/images/favicons/mstile-144x144.png?v=00zdL7O026" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <SiteHeader />
        <main>
          {children}
        </main>
      <Footer />
  </ApolloProvider>
)
