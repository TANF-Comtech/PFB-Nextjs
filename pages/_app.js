import Head from 'next/head'
import Router from 'next/router'
import withFBQ from "next-fbq"
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../lib/apollo/apolloClient'

import Variables from '../components/styles/variables'
import GlobalStyle from '../components/styles/global-css'

import DefaultContext from '../context/default-context'
import { ldJSONBasic, defaultData } from '../context/default-data'

import NavBar from '../components/global/navbar'
import Footer from '../components/global/footer'
import SiteMeta from '../components/meta/site-meta'

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

  const apolloClient = useApollo(pageProps.initialApolloState) // Instantiates Apollo client
  

  return (
    <ApolloProvider client={ apolloClient }>
      <ThemeProvider theme={ Variables }>
        <DefaultContext.Provider value={ defaultData }>
          <Head>
            <script type="application/ld+json">{ JSON.stringify(ldJSONBasic) }</script>
          </Head>
          <SiteMeta
            desc={ defaultData.meta.desc }
            title={ defaultData.meta.title }
            imgHeight={ defaultData.meta.imgHeight }
            imgSrc={ defaultData.meta.imgSrc }
            imgWidth={ defaultData.meta.imgWidth }
            path={ defaultData.meta.path }
          />
          <GlobalStyle />
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </DefaultContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default withFBQ("3047515995261591", Router)(MyApp)