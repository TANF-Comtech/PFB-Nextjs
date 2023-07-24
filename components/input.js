import React from 'react';
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
  --active: ${(props) => props.theme.blue} !important;
  --active-inner: #fff !important;
  --focus: 2px rgba(62, 159, 220, 0.3) !important;
  --border: #bccee1 !important;
  --border-hover: ${(props) => props.theme.blue} !important;
  --background: #fff !important;
  --disabled: #f6f8ff !important;
  --disabled-inner: #e1e6f9 !important;

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    /* Universal styles between checkboxes and radio buttons */
    /* We're leveraging the CSS variables set on the <form> element - check styles/global-css.js */
    /* The <input> element is acting as a container */
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
    background: var(--b, var(--background)) !important;
    border: 1px solid var(--bc, var(--border)) !important;
    cursor: pointer !important;
    height: 21px !important;
    display: inline-block !important;
    margin: 0 !important;
    outline: none !important;
    position: relative !important;
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s !important;
    vertical-align: top !important;

    /* We use the :after pseudo class to put the check, radio or switch toggle */
    &:after {
      content: '' !important;
      display: block !important;
      left: 0 !important;
      top: 0 !important;
      position: absolute !important;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s) !important;
      /* transition: transform .3s ease, opacity .2s */
    }

    /* When the input changes state, we animate the variables to a new state */
    &:checked {
      --b: var(--active) !important;
      --bc: var(--active) !important;
      --d-o: 0.3s !important;
      --d-t: 0.6s !important;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2) !important;
    }

    /* If disabled, just gray the whole thing out */
    &:disabled {
      --b: var(--disabled) !important;
      cursor: not-allowed !important;
      opacity: 0.9 !important;

      &:checked {
        --b: var(--disabled-inner) !important;
        --bc: var(--border) !important;
      }

      & + label {
        cursor: not-allowed !important;
      }
    }

    /* On hover, just animate the border in */
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover) !important;
        }
      }
    }

    &:focus {
      box-shadow: 0 0 0 var(--focus) !important;
    }

    /* Less width if a checkbox and not a switch - remember switches are just checkboxes */
    &:not(.switch) {
      flex-basis: 21px !important;
      flex-shrink: 0 !important;
      width: 21px !important;

      &:after {
        opacity: var(--o, 0) !important;
      }

      &:checked {
        --o: 1 !important;
      }
    }

    /* Stuff just for checkboxes and switches, not radio buttons */
    &:not(.switch) {
      border-radius: 7px !important;

      &:after {
        border: 2px solid var(--active-inner) !important;
        border-top: 0 !important;
        border-left: 0 !important;
        height: 9px !important;
        left: 7px !important;
        top: 4px !important;
        transform: rotate(var(--r, 20deg)) !important;
        width: 5px !important;
      }

      &:checked {
        --r: 43deg !important;
      }
    }

    /* Styling specific to the switch, notice it's wider */
    &.switch {
      border-radius: 11px !important;
      width: 38px !important;

      /* border-radius is the key part, because it's elongated */
      &:after {
        background: var(--ab, var(--border)) !important;
        border-radius: 50% !important;
        height: 15px !important;
        left: 2px !important;
        top: 2px !important;
        transform: translateX(var(--x, 0)) !important;
        width: 15px !important;
      }

      &:checked {
        --ab: var(--active-inner) !important;
        --x: 17px !important;
      }

      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: 0.6 !important;
          }
        }
      }
    }
  }
`;

export default BasicInput;
