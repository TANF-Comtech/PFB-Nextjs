import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../lib/apollo/apolloClient'

import Variables from '../components/styles/variables'
import GlobalStyle from '../components/styles/global-css'

import NavBar from '../components/global/navbar'
import Footer from '../components/global/footer'

import logo from '../public/logo.svg'
import splashOne from '../public/social-splash/PFB_Social-01.jpg'
import splashTwo from '../public/social-splash/PFB_Social-02.jpg'
import splashThree from '../public/social-splash/PFB_Social-03.jpg'
import splashFour from '../public/social-splash/PFB_Social-04.jpg'

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
  // Instantiates Apollo client
  const apolloClient = useApollo(pageProps.initialApolloState)
  const socialSplashArr = [ splashOne, splashTwo, splashThree, splashFour ]
  const ldJSONBasic = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": "#organization",
    "name": "PeopleForBikes",
    "url": "https://www.peopleforbikes.org",
    "logo": { logo },
    "sameAs": [
      "https://www.facebook.com/PeopleForBikes", 
      "https://twitter.com/peopleforbikes",
      "https://www.linkedin.com/company/peopleforbikes",
      "https://www.instagram.com/peopleforbikes",
      "https://www.youtube.com/user/peopleforbikes/videos"]
  }

  return (
    <ApolloProvider client={ apolloClient }>
      <ThemeProvider theme={ Variables }>
        <Head>
          <title>People for Bikes</title>
          <link rel="icon" href={ logo } sizes="any" type="image/svg+xml" />
          <link rel="stylesheet" href="https://cloud.typography.com/6938898/7916412/css/fonts.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" />

          <meta name="description" content="PeopleForBikes is committed to improving biking for everyone. Learn more about our work and join our movement." />
          <meta property="og:image" content={ socialSplashArr[Math.floor(Math.random()*socialSplashArr.length)] } />
          <meta property="og:image:width" content="1400" />
          <meta property="og:image:height" content="735" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PeopleForBikes" />
          <meta property="og:description" content="PeopleForBikes is committed to improving biking for everyone. Learn more about our work and join our movement." />
          <meta property="og:url" content="https://www.peopleforbikes.org/" />
          <meta property="og:site_name" content="PeopleForBikes" />
          <meta property="fb:app_id" content="#" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@peopleforbikes" />
          <meta name="twitter:title" content="PeopleForBikes | Every ride. Every rider. Join us." />
          <meta name="twitter:description" content="PeopleForBikes is committed to improving biking for everyone. Learn more about our work and join our movement." />
          <meta name="twitter:image" content={ socialSplashArr[Math.floor(Math.random()*socialSplashArr.length)] } />
          <meta name="twitter:image:width" content="1400" />
          <meta name="twitter:image:height" content="735" />
          <link rel="canonical" href="https://www.peopleforbikes.org/" />
          <script type="application/ld+json">{JSON.stringify(ldJSONBasic)}</script>
        </Head>
        <GlobalStyle />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp