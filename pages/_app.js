import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../lib/apollo/apolloClient'

import Variables from '../components/styles/variables'
import GlobalStyle from '../components/styles/global-css'

import MetaContext from '../context/meta-context'

import NavBar from '../components/global/navbar'
import Footer from '../components/global/footer'
import SiteMeta from '../components/meta/site-meta'

import splashOne from '../public/social-splash/PFB_Social-01.jpg'
import splashTwo from '../public/social-splash/PFB_Social-02.jpg'
import splashThree from '../public/social-splash/PFB_Social-03.jpg'
import splashFour from '../public/social-splash/PFB_Social-04.jpg'
import logo from '../public/PFB_Stacked_LOGO_512x512.jpg'

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

  // Set up values for site-wide meta context
  const placeholderMeta = {
    "desc" : "PeopleForBikes is committed to improving biking for everyone. Learn more about our work and join our movement.",
    "title" : "PeopleForBikes | Every ride. Every rider. Join us.",
    "imgHeight": "900",
    "imgSrc" : `${ socialSplashArr[Math.floor(Math.random()*socialSplashArr.length)] }`,
    "imgWidth" : "1600",
    "path" : "https://www.peopleforbikes.org",
  }

  // Google LD+JSON basic, for <Head>
  const ldJSONBasic = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "PeopleForBikes",
    "url": "https://www.peopleforbikes.org",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2580 55th St #200",
      "addressLocality": "Boulder",
      "addressRegion": "CO",
      "postalCode": "80301",
      "addressCountry": "US"
    },
    "telephone": "+13034494893",
    "logo": `${ logo }`,
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
        <MetaContext.Provider value={ placeholderMeta }>
          <Head>
            <script type="application/ld+json">{ JSON.stringify(ldJSONBasic) }</script>
          </Head>
          <SiteMeta
            desc={ placeholderMeta.desc }
            title={ placeholderMeta.title }
            imgHeight={ placeholderMeta.imgHeight }
            imgSrc={ placeholderMeta.imgSrc }
            imgWidth={ placeholderMeta.imgWidth }
            path={ placeholderMeta.path }
          />
          <GlobalStyle />
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </MetaContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp