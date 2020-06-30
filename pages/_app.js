import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import Variables from '../components/styles/variables'
import GlobalStyle from '../components/styles/global-css'

/**
 * MyApp is just an override of the default _app.js setup Next.js uses
 * We're adding in styled-components theme, using ThemeProvider
 * Everything else is pretty stock
 */
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider theme={Variables}>
        <Head>
          <link rel="stylesheet" href="https://cloud.typography.com/6938898/7916412/css/fonts.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp