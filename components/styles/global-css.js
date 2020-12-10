import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Put CSS variables in here if you want to use them */
  html {
    --flow-space: 1em;
  }

  /* Set up body with font basics */
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

  /* #################################### */
  /* ############## Rhythm ############## */
  /* #################################### */
  /* Natural flow and rhythm in articles by default */
  /* Read more here: https://24ways.org/2018/managing-flow-and-rhythm-with-css-custom-properties/ */
  .flow > * + * {
    margin-top: 1em;
    margin-top: var(--flow-space);
  }  

  /* Override so a button link can get top and bottom margin */
  /* This will only effect direct descendants of .flow */
  /* Learn more on this selector: https://css-tricks.com/child-and-sibling-selectors/ */
  .flow > a {
    display: block;
    margin: 4vh auto 0 auto;
    max-width: 300px;
  }

  /* If an image falls into the main content area, position it like a block */
  .flow > img {
    margin: 5vh auto;
  }
  h1, h2, h4, blockquote {
    font-family: "Tungsten A", "Tungsten B", Arial, Helvetica, sans-serif;
    font-style: normal;
  }

  /* ###################################### */
  /* ############## Headings ############## */
  /* ###################################### */

  /* Responsive type is a bit tricky, read along... */
  /* Take a full viewport (100vw) take away smallest viewport (320px) */
  /* Divide by pixels of largest and smallest media query (1200px - 320px = 880px )*/
  /* Multiply all of that by difference of the largest and smallest font size you want (120px - 80px = 40 pixels) */
  /* This makes the scale of the font responsive to the viewport */

  h1 {
    font-size: 80px;
    font-weight: 600;
    line-height: 70px;
  }
  @media screen and (min-width: 320px) {
    h1 {
      font-size: calc(80px + 40 * ((100vw - 320px) / 880));
      line-height: calc(70px + 40 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h1 {
      font-size: 120px;
      line-height: 110px;
    }
  } 

  /* Responsive type - 47-70px with 1 line-height */
  h2, h2 b, h2 strong, h2 em, h2 i {
    font-size: 54px;
    font-weight: 400;
    line-height: 54px;
    margin-bottom: 2vh;
  }
  @media screen and (min-width: 320px) {
    h2, h2 b, h2 strong, h2 em, h2 i {
      font-size: calc(54px + 16 * ((100vw - 320px) / 880));
      line-height: calc(54px + 16 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h2, h2 b, h2 strong, h2 em, h2 i {
      font-size: 70px;
      line-height: 70px;
    }
  }   

  /* Responsive type - 24-36px with 1 line-height */
  h3, legend {
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    margin-top: 3vh;
  }
  @media screen and (min-width: 320px) {
    h3, legend {
      font-size: calc(24px + 8 * ((100vw - 320px) / 880));
      line-height: calc(24px + 8 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h3, legend {
      font-size: 32px;
      line-height: 32px;
    }
  }  

  /* Responsive type - 24-36px with 1 line-height */
   h4 {
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    margin-top: 3vh;
  }
  @media screen and (min-width: 320px) {
    h4 {
      font-size: calc(18px + 8 * ((100vw - 320px) / 880));
      line-height: calc(18px + 8 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h4 {
      font-size: 26px;
      line-height: 26px;
    }
  }  



  /* ################################## */
  /* ############## Copy ############## */
  /* ################################## */

  /* Responsive type - 
  /* Bigger (if want it): 17.5px-28px with 1.75 line-height (30.5-49px) */
  p, b, strong, em, i, span, label, a, a::visited, a::focus, a:active, a:hover {
    font-size: 18px;
    line-height: 26px;
  }
  @media screen and (min-width: 320px) {
    p, b, strong, em, i, span, label {
      font-size: calc(18px + 4 * ((100vw - 320px) / 880));
      line-height: calc(26px + 10 * ((100vw - 320px) / 880));
      margin-bottom: 3vh;
    }
  }
  @media screen and (min-width: 1200px) {
    p, b, strong, em, i, span, label {
      font-size: 22px;
      line-height: 36px;
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
    font-size: 18px;
    line-height: 26px;
  }
  @media screen and (min-width: 320px) {
    li, li > em, li > i, li > b, li > strong {
      font-size: calc(18px + 4 * ((100vw - 320px) / 880));
      line-height: calc(26px + 10 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    li, li > em, li > i, li > b, li > strong {
      font-size: 22px;
      line-height: 36px;
    }
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

  a, a:visited, a:focus, a:active, a:hover {
    color: ${(props) => props.theme.blue};
    text-decoration: underline;
    transition: 0.2s ease-in-out;
  }

  /* #################################### */
  /* ############## IMAGES ############## */
  /* #################################### */

  /* Make images responsive */
  /* Note that .flow controls top/bottom margins on img blocks */
  img {
    display: block;
    height: auto;
    max-width: 100%;
  }
  

  /* ################################### */
  /* ############## FORMS ############## */
  /* ################################### */

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  fieldset {
    padding: 3vh 3vw;
  }

  /* Set of CSS variables scoped to just the input elements */
  form {
    --active: ${(props) => props.theme.blue};
    --active-inner: #fff;
    --focus: 2px rgba(62, 159, 220, 0.3);
    --border: #bccee1;
    --border-hover: ${(props) => props.theme.blue};
    --background: #fff;
    --disabled: #F6F8FF;
    --disabled-inner: #E1E6F9;
  }

  /* ####################################### */
  /* ############## ANIMATION ############## */
  /* ####################################### */

  /* Reusable classes for animating things around the site */
  .isVisibleY {
    transform: translateY(0%);
  }

  .isHiddenY {
    transform: translateY(-105%);
  }

  .isVisibleX {
    transform: translateX(0%);
  }

  .isHiddenX {
    transform: translateX(-105%);
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* ####################################### */
  /* ############## ACCORDION ############## */
  /* ####################################### */

  /* Style the accordion section */
  .accordion__section {
    display: flex;
    flex-direction: column;
  }

  /* Style the buttons that are used to open and close the accordion panel */
  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    display: flex;
    align-items: center;
    border: none;
    outline: none;
    transition: background-color 0.6s ease;
  }

  /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
  .accordion:hover,
  .active {
    background-color: #ccc;
  }

  /* Style the accordion content title */
  .accordion__title {
    font-weight: 600;
    font-size: 14px;
  }

  /* Style the accordion chevron icon */
  .accordion__icon {
    margin-left: auto;
    transform: rotate(0);
    transition: transform 0.6s ease;
  }

  /* Style to rotate icon when state is active */
  .rotate {
    transform: rotate(90deg);
  }

  /* Style the accordion content panel. Note: hidden by default */
  .accordion__content {
    background-color: white;
    overflow: hidden;
    transition: max-height 0.6s ease;
  }

  /* Style the accordion content text */
  .accordion__text {
    font-weight: 400;
    font-size: 14px;
    padding: 18px;
  }
}

/*! Flickity v2.1.2
https://flickity.metafizzy.co
---------------------------------------------- */

.flickity-enabled {
  margin-bottom: 100px;
  position: relative;
}

.flickity-enabled:focus {
  outline: none;
}

.flickity-viewport {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.flickity-slider {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* draggable */

.flickity-enabled.is-draggable {
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.flickity-enabled.is-draggable .flickity-viewport {
  cursor: move;
  cursor: -webkit-grab;
  cursor: grab;
}

.flickity-enabled.is-draggable .flickity-viewport.is-pointer-down {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

/* ---- flickity-button ---- */

.flickity-button {
  position: absolute;
  background: hsla(0, 0%, 100%, 0.75);
  border: none;
  color: #333;
}

.flickity-button:hover {
  background: white;
  cursor: pointer;
}

.flickity-button:focus {
  outline: none;
  box-shadow: 0 0 0 5px #19f;
}

.flickity-button:active {
  opacity: 0.6;
}

.flickity-button:disabled {
  opacity: 0.3;
  cursor: auto;
  /* prevent disabled button from capturing pointer up event. #716 */
  pointer-events: none;
}

.flickity-button-icon {
  fill: #333;
}

/* ---- previous/next buttons ---- */

.flickity-prev-next-button {
  top: 50%;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  /* vertically center */
  transform: translateY(-50%);
}

.flickity-prev-next-button.previous {
  left: 10px;
}
.flickity-prev-next-button.next {
  right: 10px;
}
/* right to left */
.flickity-rtl .flickity-prev-next-button.previous {
  left: auto;
  right: 10px;
}
.flickity-rtl .flickity-prev-next-button.next {
  right: auto;
  left: 10px;
}

.flickity-prev-next-button .flickity-button-icon {
  position: absolute;
  left: 20%;
  top: 20%;
  width: 60%;
  height: 60%;
}

/* ---- page dots ---- */

.flickity-page-dots {
  position: absolute;
  width: 100%;
  bottom: -50px;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  line-height: 1;
}

.flickity-rtl .flickity-page-dots {
  direction: rtl;
}

.flickity-page-dots .dot {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin: 0 10px;
  background: #333;
  border-radius: 50%;
  opacity: 0.25;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.flickity-page-dots .dot.is-selected {
  background: #D0021B;
  opacity: 1;
}

`;

export default GlobalStyle;
