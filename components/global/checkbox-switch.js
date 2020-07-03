import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 1.5vh 0;
`

const CheckboxInput = styled.input.attrs({
  type: 'checkbox'
})`
  @supports(-webkit-appearance: none) or (-moz-appearance: none) {
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

    &:after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
      /* transition: transform .3s ease, opacity .2s */
    }

    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }

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

    &.switch {
      border-radius: 11px;
      width: 38px;
      
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
`

const CheckboxLabel = styled.label`
  cursor: pointer;
  font-size: 14px;
  line-height: 21px;
  margin-left: 8px;

  @media (min-width: ${props => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${props => props.theme.lg}) {
    font-size: 18px;
  }
`

/**
 * <CheckboxSwitch>
 * 
 * A checkbox component for forms that can appear like a checkbox or switch
 * A container holds the <input> and <label> together in a flexbox for alignment
 * There is a LOT of style and pseudo classes required to pull this off above
 * Comments are mostly in the styled-components above
 * 
 * @param {string} checkboxLabel - words that appear next to the input
 * @param {string} checked - value for the input
 * @param {string} className - should just be 'switch' if you want to see a switch
 * @param {string} disabled - makes the input visible but invalid
 */
const CheckboxSwitch = ({ 
  checkboxLabel, 
  checked, 
  className, 
  disabled 
}) => {

  // Assigns a random identifier to each input/label pair
  const randomID = Math.round(Math.random() * 10000000)

  // Check to make sure this is rendered
  const [rendered, setRendered] = useState(false);

  // useEffect() is similar to componentDidMount
  // so when the component gets mounted, we set it true
  useEffect(() => {
    setRendered(true),
    () => { setRendered(false); }
  });

  // Now we conditionally render to avoid SSR issues
  if(rendered) {
    return (
      <>
        <Container>
          <CheckboxInput
            checked={ checked }
            className={ className } 
            disabled={ disabled } 
            id={ randomID } 
            type="checkbox" 
          />
          <CheckboxLabel htmlFor={ randomID }>
            { checkboxLabel }
          </CheckboxLabel>
        </Container>
      </>
    )
  }

  // If rendering fails
  else {
    return (
      <p>Still loading...</p>
    )
  }

}

export default CheckboxSwitch