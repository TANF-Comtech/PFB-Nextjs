import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../lib/apollo/apolloClient'

import Variables from '../components/styles/variables'
import GlobalStyle from '../components/styles/global-css'

import logo from '../public/logo.svg'

/**
 * <MyApp>
 * 
 * This is an override of the default _app.js setup Next.js uses
 * 
 * We're adding in two providers:
 * <ThemeProvider> is for the styled-components theme, which makes the styles/variables globally available
 * <ApolloProvider> gives components global access to GraphQL data fetched in the components (like menus)
 * 
 * Also:
 * <Head> provides global defaults to the HTML head of each page, they can easily be modified per page
 * <GlobalStyle> is styled-components way to provide an CSS doc to entire site
 * <Component> is a Next.js default that renders all components and provides props to them
 */
const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={ apolloClient }>
      <ThemeProvider theme={ Variables }>
        <Head>
          <title>People for Bikes</title>
          <link rel="icon" href={ logo } sizes="any" type="image/svg+xml" />
          <link rel="stylesheet" href="https://cloud.typography.com/6938898/7916412/css/fonts.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp