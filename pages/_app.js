import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../lib/apollo/apolloClient'

import Variables from '../components/styles/variables'
import GlobalStyle from '../components/styles/global-css'

import NavBar from '../components/global/navbar'
import Footer from '../components/global/footer'
import SiteMeta from '../components/meta/site-meta'

import splashOne from '../public/social-splash/PFB_Social-01.jpg'
import splashTwo from '../public/social-splash/PFB_Social-02.jpg'
import splashThree from '../public/social-splash/PFB_Social-03.jpg'
import splashFour from '../public/social-splash/PFB_Social-04.jpg'

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

  const apolloClient = useApollo(pageProps.initialApolloState) // Instantiates Apollo client
  const socialSplashArr = [ splashOne, splashTwo, splashThree, splashFour ] // social images
  // Google LD+JSON basic
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
          <link rel="icon" href={ logo } sizes="any" type="image/svg+xml" />
          <link rel="stylesheet" href="https://cloud.typography.com/6938898/7916412/css/fonts.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" />
          <meta property="fb:app_id" content="#" />
          <script type="application/ld+json">{JSON.stringify(ldJSONBasic)}</script>
          <meta property="og:site_name" 
            content="PeopleForBikes"
            key="ogsite" />
          <meta property="og:locale" 
                content="en_US" 
                key="oglocale" />
          <meta property="og:type" 
                content="website" 
                key="ogtype" />
          <meta name="twitter:card" 
                content="summary_large_image" 
                key="twtrcard" />
          <meta name="twitter:site" 
                content="@peopleforbikes" 
                key="twtrsite" />
        </Head>
        <SiteMeta
          desc="PeopleForBikes is committed to improving biking for everyone. Learn more about our work and join our movement."
          title="PeopleForBikes | Every ride. Every rider. Join us."
          imgHeight="900"
          imgSrc={ socialSplashArr[Math.floor(Math.random()*socialSplashArr.length)] }
          imgWidth="1600"
          path="https://www.peopleforbikes.org"
        />
        <GlobalStyle />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp