import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
.legacy-page {

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
    font-family: 'dharma-gothic-e', Arial, Helvetica, sans-serif;
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
    overflow-wrap: break-word;
    word-wrap: break-word;
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
  ul, ol {
    margin: 20px 40px;
  }
  @media screen and (min-width: 320px) {
    ul, ol {
      margin: calc(20px + 10 * ((100vw - 320px) / 880)) calc(40px + 20 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    ul, ol {
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

  input[type="checkbox"] {
    --active: ${(props) => props.theme.blue};
    --active-inner: #fff;
    --focus: 2px rgba(62, 159, 220, 0.3);
    --border: #bccee1;
    --border-hover: ${(props) => props.theme.blue};
    --background: #fff;
    --disabled: #F6F8FF;
    --disabled-inner: #E1E6F9;

    @supports(-webkit-appearance: none) or (-moz-appearance: none) {

      /* Universal styles between checkboxes and radio buttons */
      /* We're leveraging the CSS variables set on the <form> element - check styles/global-css.js */
      /* The <input> element is acting as a container */
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: var(--b, var(--background));
      border: 1px solid var(--bc, var(--border));
      cursor: pointer;
      height: 21px;
      display: inline-block;
      margin: 0;
      outline: none;
      position: relative;
      transition: background .3s, border-color .3s, box-shadow .2s;
      vertical-align: top;

      /* We use the :after pseudo class to put the check, radio or switch toggle */
      &:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
        /* transition: transform .3s ease, opacity .2s */
      }

      /* When the input changes state, we animate the variables to a new state */
      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: .3s;
        --d-t: .6s;
        --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
      }

      /* If disabled, just gray the whole thing out */
      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: .9;

        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }

        & + label {
          cursor: not-allowed;
        }
      }

      /* On hover, just animate the border in */
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }

      &:focus {
        box-shadow: 0 0 0 var(--focus);
      }

      /* Less width if a checkbox and not a switch - remember switches are just checkboxes */
      &:not(.switch) {
        flex-basis: 21px;
        flex-shrink: 0;
        width: 21px;

        &:after {
          opacity: var(--o, 0);
        }

        &:checked {
          --o: 1;
        }
      }

      /* Stuff just for checkboxes and switches, not radio buttons */
      &:not(.switch) {
        border-radius: 7px;
        margin-right: 5px;

        &:after {
          border: 2px solid var(--active-inner);
          border-top: 0;
          border-left: 0;
          height: 9px;
          left: 7px;
          top: 4px;
          transform: rotate(var(--r, 20deg));
          width: 5px;
        }

        &:checked {
          --r: 43deg;
        }
      }

      /* Styling specific to the switch, notice it's wider */
      &.switch {
        border-radius: 11px;
        width: 38px;

        /* border-radius is the key part, because it's elongated */
        &:after {
          background: var(--ab, var(--border));
          border-radius: 50%;
          height: 15px;
          left: 2px;
          top: 2px;
          transform: translateX(var(--x, 0));
          width: 15px;
        }

        &:checked {
          --ab: var(--active-inner);
          --x: 17px;
        }

        &:disabled {
          &:not(:checked) {
            &:after {
              opacity: .6;
            }
          }
        }
      }
    }
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
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
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

  /* Select2 */
  .select2-container .select2-choice >.select2-chosen {
    font-size: 14px !important;
    height: 25px !important;
  }

  .select2-results li,
  .select2-results .select2-result-label,
  .select2-results,
  .select2-no-results,
  .select2-searching,
  .select2-ajax-error,
  .select2-selection-limit,
  .select2-result-selectable .select2-match,
  .select2-result-unselectable .select2-match {
    font-size: 14px !important;
  }

  /* Algolia Search */
  .ais-Breadcrumb-list,.ais-CurrentRefinements-list,.ais-HierarchicalMenu-list,.ais-Hits-list,.ais-InfiniteHits-list,.ais-InfiniteResults-list,.ais-Menu-list,.ais-NumericMenu-list,.ais-Pagination-list,.ais-RatingMenu-list,.ais-RefinementList-list,.ais-Results-list,.ais-ToggleRefinement-list{margin:0;padding:0;list-style:none}.ais-ClearRefinements-button,.ais-CurrentRefinements-delete,.ais-CurrentRefinements-reset,.ais-GeoSearch-redo,.ais-GeoSearch-reset,.ais-HierarchicalMenu-showMore,.ais-InfiniteHits-loadMore,.ais-InfiniteHits-loadPrevious,.ais-InfiniteResults-loadMore,.ais-Menu-showMore,.ais-RangeInput-submit,.ais-RefinementList-showMore,.ais-SearchBox-reset,.ais-SearchBox-submit,.ais-VoiceSearch-button{padding:0;overflow:visible;font:inherit;line-height:normal;color:inherit;background:none;border:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ais-ClearRefinements-button::-moz-focus-inner,.ais-CurrentRefinements-delete::-moz-focus-inner,.ais-CurrentRefinements-reset::-moz-focus-inner,.ais-GeoSearch-redo::-moz-focus-inner,.ais-GeoSearch-reset::-moz-focus-inner,.ais-HierarchicalMenu-showMore::-moz-focus-inner,.ais-InfiniteHits-loadMore::-moz-focus-inner,.ais-InfiniteHits-loadPrevious::-moz-focus-inner,.ais-InfiniteResults-loadMore::-moz-focus-inner,.ais-Menu-showMore::-moz-focus-inner,.ais-RangeInput-submit::-moz-focus-inner,.ais-RefinementList-showMore::-moz-focus-inner,.ais-SearchBox-reset::-moz-focus-inner,.ais-SearchBox-submit::-moz-focus-inner,.ais-VoiceSearch-button::-moz-focus-inner{padding:0;border:0}.ais-ClearRefinements-button[disabled],.ais-CurrentRefinements-delete[disabled],.ais-CurrentRefinements-reset[disabled],.ais-GeoSearch-redo[disabled],.ais-GeoSearch-reset[disabled],.ais-HierarchicalMenu-showMore[disabled],.ais-InfiniteHits-loadMore[disabled],.ais-InfiniteHits-loadPrevious[disabled],.ais-InfiniteResults-loadMore[disabled],.ais-Menu-showMore[disabled],.ais-RangeInput-submit[disabled],.ais-RefinementList-showMore[disabled],.ais-SearchBox-reset[disabled],.ais-SearchBox-submit[disabled],.ais-VoiceSearch-button[disabled]{cursor:default}.ais-Breadcrumb-item,.ais-Breadcrumb-list,.ais-Pagination-list,.ais-PoweredBy,.ais-RangeInput-form,.ais-RatingMenu-link{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ais-GeoSearch,.ais-GeoSearch-map{height:100%}.ais-HierarchicalMenu-list .ais-HierarchicalMenu-list{margin-left:1em}.ais-PoweredBy-logo{display:block;height:1.2em;width:auto}.ais-RatingMenu-starIcon{display:block;width:20px;height:20px}.ais-SearchBox-input::-ms-clear,.ais-SearchBox-input::-ms-reveal{display:none;width:0;height:0}.ais-SearchBox-input::-webkit-search-cancel-button,.ais-SearchBox-input::-webkit-search-decoration,.ais-SearchBox-input::-webkit-search-results-button,.ais-SearchBox-input::-webkit-search-results-decoration{display:none}.ais-RangeSlider .rheostat{overflow:visible;margin-top:40px;margin-bottom:40px}.ais-RangeSlider .rheostat-background{height:6px;top:0;width:100%}.ais-RangeSlider .rheostat-handle{margin-left:-12px;top:-7px}.ais-RangeSlider .rheostat-background{position:relative;background-color:#fff;border:1px solid #aaa}.ais-RangeSlider .rheostat-progress{position:absolute;top:1px;height:4px;background-color:#333}.rheostat-handle{position:relative;z-index:1;width:20px;height:20px;background-color:#fff;border:1px solid #333;border-radius:50%;cursor:-webkit-grab;cursor:grab}.rheostat-marker{margin-left:-1px;position:absolute;width:1px;height:5px;background-color:#aaa}.rheostat-marker--large{height:9px}.rheostat-value{padding-top:15px}.rheostat-tooltip,.rheostat-value{margin-left:50%;position:absolute;text-align:center;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.rheostat-tooltip{top:-22px}

}
`;

export default GlobalStyle;
