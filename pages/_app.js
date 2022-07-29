import React, { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '~/lib/apollo/apolloClient';
import useWindowSize from '~/hooks/useWindowSize';
import MenuContext from '~/context/menu/menu-context';
import { AuthProvider } from '~/context/auth/auth-context';

import Variables from '~/components/styles/variables';
import GlobalStyle from '~/components/styles/global-css';
import NavBar from '~/components/navbar';
import Footer from '~/components/footer';
import PageTransition from '~/components/transition';

import '~/styles/globals.css';

/**
 * ldJSONBasic (variable)
 *
 * This is a LDJSON signature for the organization
 * We add this into _app.js so it's available around the site
 *
 * @param { object } ldJSONBasic - contains all LDJSON for a basic Google Organization
 */
const ldJSONBasic = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.peopleforbikes.org/mission',
  'name': 'PeopleForBikes',
  'url': 'https://www.peopleforbikes.org',
  'privacyPolicy': 'https://www.peopleforbikes.org/privacy',
  'alternateName': ['PFB', 'BikesBelong', 'Bicycle Product Suppliers Association', 'BPSA'],
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '2580 55th St #200',
    'addressLocality': 'Boulder',
    'addressRegion': 'CO',
    'postalCode': '80301',
    'addressCountry': 'US',
  },
  'telephone': '+13034494893',
  'logo': {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    'url': 'https://pfb-main-site-assets.s3.amazonaws.com/PFB_Stacked_LOGO_512x512.jpg',
    'height': 512,
    'width': 512,
  },
  'sameAs': [
    'https://www.facebook.com/PeopleForBikes',
    'https://twitter.com/peopleforbikes',
    'https://www.linkedin.com/company/peopleforbikes',
    'https://www.instagram.com/peopleforbikes',
    'https://www.youtube.com/user/peopleforbikes/videos',
  ],
};

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
  const apolloClient = useApollo(pageProps.initialApolloState);

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
  const windowSize = useWindowSize();

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={Variables}>
        <MenuContext.Provider
          value={{
            advocacyState,
            setAdvocacyState,
            handleAdvocacy,
            globalSites,
            setGlobalSites,
            handleGlobalSites,
            ourWorkState,
            setOurWorkState,
            handleOurWork,
            ridesState,
            setRidesState,
            handleRides,
            search,
            setSearch,
            handleSearch,
            windowSize,
          }}
        >
          <AuthProvider>
            <Head>
              <script type="application/ld+json">{JSON.stringify(ldJSONBasic)}</script>
            </Head>
            <GlobalStyle />
            <NavBar />
            <PageTransition location={router.pathname}>
              <Component {...pageProps} key={router.route} />
            </PageTransition>
            <Footer />
          </AuthProvider>
        </MenuContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
