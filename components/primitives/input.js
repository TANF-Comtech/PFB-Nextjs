import styled from 'styled-components';

/**
 * <BasicInput>
 *
 * This is a styled component primitive that checkboxes, switches and radio buttons use
 * It replaces the ugly inputs standard to HTML browser, but is complicated
 * This method centers around the appearance property, which can hide browser defaults
 *
 * We use @supports to check for browser coverage, so older browsers won't even see this
 * Then, we sniff checkbox vs radio buttons (switches are just checkboxes styled differently)
 * This could probably be extended to other inputs - but that is for later...
 *
 * Based on idea I read in css-tricks:
 * https://css-tricks.com/custom-styling-form-inputs-with-modern-css-features/
 */
const BasicInput = styled.input`
  --active: ${(props) => props.theme.blue};
  --active-inner: #fff;
  --focus: 2px rgba(62, 159, 220, 0.3);
  --border: #bccee1;
  --border-hover: ${(props) => props.theme.blue};
  --background: #fff;
  --disabled: #f6f8ff;
  --disabled-inner: #e1e6f9;

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
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
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
    vertical-align: top;

    /* We use the :after pseudo class to put the check, radio or switch toggle */
    &:after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      /* transition: transform .3s ease, opacity .2s */
    }

    /* When the input changes state, we animate the variables to a new state */
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: 0.3s;
      --d-t: 0.6s;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }

    /* If disabled, just gray the whole thing out */
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;

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
            opacity: 0.6;
          }
        }
      }
    }
  }
`;

export default BasicInput;
