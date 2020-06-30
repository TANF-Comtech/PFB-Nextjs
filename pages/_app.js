import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  // Colors
  black: 'rgb(26,26,26)',
  darkGray: '#4D4D4F',
  mediumGray: 'rgb(216,216,216)',
  lightGray: '#8A8A8D',
  red: '#D23823',
  blue: '#3E9FDC',

  // Breakpoints
  ty: '380px',
  xs: '480px',
  sm: '768px',
  md: '980px',
  lg: '1200px',
  xl: '1600px',

  // Z-index
  zIndexNegative: '-10',
  zIndex00: '0',
  zIndex01: '10',
  zIndex02: '20',
  zIndex03: '30',
  zIndex04: '40',
  zIndex05: '50',
  zIndex06: '60',
  zIndex07: '70',
  zIndex08: '80',
  zIndex09: '90'
}

const GlobalStyle = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-size: 16px;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* Make images responsive */
  img {
    display: block;
    height: auto;
    max-width: 100%;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Natural flow and rhythm in articles by default */
  /* Read more here: https://24ways.org/2018/managing-flow-and-rhythm-with-css-custom-properties/ */
  .flow {
    --flow-space: 1em;
  }

  .flow > * + * {
    margin-top: 1em;
    margin-top: var(--flow-space);
  }  
`

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
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