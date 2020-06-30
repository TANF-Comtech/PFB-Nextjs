import { createGlobalStyle } from 'styled-components'

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

  h1 {
    font-family: "Tungsten A", "Tungsten B", Arial, Helvetica, sans-serif;
    font-size: 4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 4rem;
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

export default GlobalStyle