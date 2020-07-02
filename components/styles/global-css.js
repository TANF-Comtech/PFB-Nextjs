import { createGlobalStyle } from 'styled-components'

 const GlobalStyle = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.5;
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  h5, 
  h6,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
    padding: 0;
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

  /* Override so a button link can get top and bottom margin */
  /* This will only effect direct descendants of .flow */
  /* Learn more on this selector: https://css-tricks.com/child-and-sibling-selectors/ */
  .flow > a {
    display: block;
    margin-top: 4vh;
  }

  h1, h2, blockquote {
    font-family: "Tungsten A", "Tungsten B", Arial, Helvetica, sans-serif;
    font-style: normal;
  }

  /* Responsive Typography */
  /* Take a full viewport (100vw) take away smallest viewport (320px) */
  /* Divide by pixels of largest and smallest media query (1200px - 320px = 880px )*/
  /* Multiply all of that by difference of the largest and smallest font size you want (120px - 80px = 40 pixels) */
  /* This makes the scaler of the font responsive to the viewport */
  h1 {
    font-size: 80px;
    font-weight: 600;
    line-height: 80px;
  }
  @media screen and (min-width: 320px) {
    h1 {
      font-size: calc(80px + 40 * ((100vw - 320px) / 880));
      line-height: calc(80px + 40 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h1 {
      font-size: 120px;
      line-height: 120px;
    }
  } 

  /* Responsive type - 47-70px with 1 line-height */
  h2 {
    font-size: 46.66px;
    font-weight: 400;
    line-height: 46.66px;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(46.66px + 23.33 * ((100vw - 320px) / 880));
      line-height: calc(46.66px + 23.33 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 70px;
      line-height: 70px;
    }
  }   

  /* Responsive type - 24-36px with 1 line-height */
  h3, h4 {
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
  }
  @media screen and (min-width: 320px) {
    h3 {
      font-size: calc(24px + 12 * ((100vw - 320px) / 880));
      line-height: calc(24px + 12 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h3 {
      font-size: 36px;
      line-height: 36px;
    }
  }  

  h4 {
    color: '#D23823';
  }

  /* Responsive type - 17.5px-28px with 1.75 line-height (30.5-49px) */
  p, b, strong, em, i, span, a, a::visited, a::focus, a:active, a:hover {
    font-size: 17.5px;
    line-height: 32px;
  }
  @media screen and (min-width: 320px) {
    p, b, strong, em, i, span {
      font-size: calc(17.5px + 11.5 * ((100vw - 320px) / 880));
      line-height: calc(32px + 21 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    p, b, strong, em, i, span {
      font-size: 28px;
      line-height: 53px;
    }
  }    
  b, strong {
    font-weight: 700;
  }
  em, i {
    font-style: italic;
  }

  /* set up lists correctly */
  ul {
    margin: 20px 40px;
  }
  @media screen and (min-width: 320px) {
    ul {
      margin: calc(20px + 10 * ((100vw - 320px) / 880)) calc(40px + 20 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    ul {
      margin: 30px 60px;
    }
  }

  li, li > em, li > i, li > b, li > strong {
    font-size: 16px;
    line-height: 30px;
  }
  @media screen and (min-width: 320px) {
    li, li > em, li > i, li > b, li > strong {
      font-size: calc(16px + 8 * ((100vw - 320px) / 880));
      line-height: calc(30px + 16 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    li, li > em, li > i, li > b, li > strong {
      font-size: 24px;
      line-height: 46px;
    }
  } 

  /* Make images responsive */
  /* Note that .flow controls top/bottom margins on img blocks */
  img {
    box-shadow: ${props => props.theme.basicBoxShadow};
    display: block;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Set off blockquotes */
  blockquote {
    color: #D23823;
    font-size: 46.66px;
    font-weight: 400;
    line-height: 46.66px;
    margin: calc( var(--flow-space) * 0.75 ) 0 !important; /* overrides .flow */
  }
  @media screen and (min-width: 320px) {
    blockquote {
      font-size: calc(46.66px + 23.33 * ((100vw - 320px) / 880));
      line-height: calc(46.66px + 23.33 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    blockquote {
      font-size: 70px;
      line-height: 70px;
    }
  }
  
  /* Anchor styles */
  a, a:visited, a:focus, a:active, a:hover {
    color: ${props => (props.theme.blue)};
    text-decoration: underline;
    transition: 0.2s ease-in-out;
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
`

export default GlobalStyle