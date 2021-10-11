import { useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/apolloClient'

import Variables from '../components/styles/variables'
import GlobalStyle from '../components/styles/global-css'

import useWindowSize from "../hooks/useWindowSize"

import DefaultContext from '../context/default/default-context'
import MenuContext from '../context/menu/menu-context'
import { ldJSONBasic, defaultData } from '../context/default/default-data'

import { AuthProvider } from '../context/auth/auth-context'

import NavBar from '../components/global/navbar'
import Footer from '../components/global/footer'
import PageTransition from '../components/global/transition'

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
const MyApp = ({ Component, pageProps, router }) => {

  // Instantiates Apollo client
  const apolloClient = useApollo(pageProps.initialApolloState) 

  // Advocacy Menu control
  const [advocacyState, setAdvocacyState] = useState(false);
  const handleAdvocacy = () => {
    setAdvocacyState(!advocacyState);
  };

  // Network of Sites Menu control
  const [globalSites, setGlobalSites] = useState(false);
  const handleGlobalSites = () => {
    setGlobalSites(!globalSites);
  };

  // Our Work Menu Control
  const [ourWorkState, setOurWorkState] = useState(false);
  const handleOurWork = () => {
    setOurWorkState(!ourWorkState);
  };  

  // Rides Menu Control
  const [ridesState, setRidesState] = useState(false);
  const handleRides = () => {
    setRidesState(!ridesState);
  };    

  // Search Menu controls
  const [search, setSearch] = useState(false);
  const handleSearch = () => {
    setSearch(!search);
  };

  // Global look at height/width of page
  const windowSize = useWindowSize()

  return (
    <ApolloProvider client={ apolloClient }>
      <ThemeProvider theme={ Variables }>
        <DefaultContext.Provider value={ defaultData }>
          <MenuContext.Provider value={{ 
            advocacyState, setAdvocacyState, handleAdvocacy, 
            globalSites, setGlobalSites, handleGlobalSites,
            ourWorkState, setOurWorkState, handleOurWork, 
            ridesState, setRidesState, handleRides, 
            search, setSearch, handleSearch, 
            windowSize
          }}>          
            <AuthProvider>
            <Head>
              <script type="application/ld+json">{ JSON.stringify(ldJSONBasic) }</script>
            </Head>
            <GlobalStyle />
            <NavBar />
            <PageTransition location={ router.pathname }>
              <Component {...pageProps} key={ router.route }/>
            </PageTransition>
            <Footer />
            </AuthProvider>
          </MenuContext.Provider>
        </DefaultContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp